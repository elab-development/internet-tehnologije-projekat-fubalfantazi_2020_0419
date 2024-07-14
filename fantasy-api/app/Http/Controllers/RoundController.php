<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoundResource;
use App\Models\GameStats;
use App\Models\Round;
use App\Models\UserRoundTeam;
use App\Models\UserTeam;
use App\Models\UserTeamPlayers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RoundController extends BaseController
{
    public function index()
    {
        $rounds = Round::all();
        return $this->success(RoundResource::collection($rounds), 'Rounds retrieved successfully');
    }

    public function show($id)
    {
        $round = Round::find($id);
        if ($round) {
            return $this->success(new RoundResource($round), 'Round retrieved successfully');
        }
        return $this->error('Round not found', [], 404);
    }

    public function startRound(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'round_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $round = Round::find($request->round_id);

        $round->status = Round::STATUS_ACTIVE;
        $round->save();

        $allTeamPlayers = UserTeamPlayers::all();

        foreach ($allTeamPlayers as $teamPlayer) {
            UserRoundTeam::create([
                'user_id' => $teamPlayer->userTeam->user_id,
                'round_id' => $round->id,
                'player_id' => $teamPlayer->player_id,
                'points' => 0,
                'user_team_id' => $teamPlayer->user_team_id
            ]);
        }
        return $this->success(new RoundResource($round), 'Round started');
    }

    public function endRound(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'round_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $round = Round::find($request->round_id);

        $round->status = Round::STATUS_ENDED;
        $round->save();

        //end round logic - add later
        $userTeams = UserTeam::all();

        foreach ($userTeams as $userTeam) {
            $userTeam->recalculateTotalPoints();
        }

        return $this->success(new RoundResource($round), 'Round ended');
    }

    public function findActiveRound(Request $request)
    {
        $round = Round::where('status', Round::STATUS_ACTIVE)->first();
        if ($round) {
            return $this->success(new RoundResource($round), 'Active round found');
        }
        return $this->error('Active round not found', [], 404);
    }

    public function playerPointsPerRound(Request $request, $roundId)
    {

        $user_id = Auth::id();

        $userTeam = UserTeam::where('user_id', $user_id)->first();

        if (!$userTeam) {
            return $this->error('User team not found', [], 404);
        }

        $players = DB::table('round_teams')
            ->join('players', 'round_teams.player_id', '=', 'players.id')
            ->join('teams', 'players.team_id', '=', 'teams.id')
            ->select('players.*', 'teams.team_name', 'teams.team_short', 'round_teams.points')
            ->where('round_teams.round_id', $roundId)
            ->where('round_teams.user_team_id', $userTeam->id)
            ->orderBy('round_teams.points', 'desc')
            ->get();
        return $this->success($players, 'Players points per round');
    }

    public function findEndedRounds(Request $request)
    {
        $rounds = Round::where('status', Round::STATUS_ENDED)->get();
        return $this->success(RoundResource::collection($rounds), 'Ended rounds found');
    }
}
