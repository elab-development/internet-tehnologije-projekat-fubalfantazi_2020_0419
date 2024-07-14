<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameStatResource;
use App\Models\Game;
use App\Models\GameStats;
use App\Models\Player;
use App\Models\UserRoundTeam;
use App\Models\UserTeam;
use App\Models\UserTeamPlayers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GameStatController extends BaseController
{
    public function findStatsByGame(Request $request, $gameId)
    {
        $stats = GameStats::where('game_id', $gameId)->get();

        return $this->success(GameStatResource::collection($stats), 'Stats found');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'game_id' => 'required|integer',
            'player_id' => 'required|integer',
            'player_goals' => 'required|integer',
            'player_assists' => 'required|integer',
            'player_yellow_cards' => 'required|integer',
            'player_red_cards' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $game = Game::find($request->game_id);

        if (!$game) {
            return $this->error('Game not found', [], 404);
        }

        $points = 0;

        $player = Player::find($request->player_id);

        if ($player->player_position === 'GK' || $player->player_position === 'DF') {
            $points += $request->player_goals * GameStats::GOAL_POINTS_DEF_GK;
        } elseif ($player->player_position === 'MF') {
            $points += $request->player_goals * GameStats::GOAL_POINTS_MF;
        } elseif ($player->player_position === 'FW') {
            $points += $request->player_goals * GameStats::GOAL_POINTS_FW;
        }

        $points += $request->player_assists * GameStats::ASSIST_POINTS;

        $points += $request->player_yellow_cards * GameStats::YELLOW_CARD_POINTS;

        $points += $request->player_red_cards * GameStats::RED_CARD_POINTS;

        $roundId = $game->round_id;

        $stat = GameStats::create([
            'game_id' => $request->game_id,
            'player_id' => $request->player_id,
            'player_goals' => $request->player_goals,
            'player_assists' => $request->player_assists,
            'player_yellow_cards' => $request->player_yellow_cards,
            'player_red_cards' => $request->player_red_cards,
            'points' => $points,
        ]);
        //find players for round and update points
        $userRoundTeam = UserRoundTeam::where('round_id', $roundId)->where('player_id', $request->player_id)->get();

        foreach ($userRoundTeam as $team) {
            $team->points = $points;
            $team->save();
        }

        $userTeams = UserTeam::all();

        foreach ($userTeams as $team) {
            $team->recalculateTotalPoints();
        }

        return $this->success(new GameStatResource($stat), 'Stat created');
    }
}
