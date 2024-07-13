<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoundResource;
use App\Models\GameStats;
use App\Models\Round;
use App\Models\UserRoundTeam;
use App\Models\UserTeam;
use App\Models\UserTeamPlayers;
use Illuminate\Http\Request;

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

    public function startRound(Request $request, $id)
    {
        $round = Round::find($id);
        if (!$round) {
            return $this->error('Round not found', [], 404);
        }

        $round->round_status = Round::STATUS_ACTIVE;
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

    public function endRound(Request $request, $id)
    {
        $round = Round::find($id);
        if (!$round) {
            return $this->error('Round not found', [], 404);
        }

        $round->round_status = Round::STATUS_ENDED;
        $round->save();

        //end round logic - add later
        $userTeams = UserTeam::all();

        foreach ($userTeams as $userTeam) {
            $userTeam->recalculateTotalPoints();
        }

        return $this->success(new RoundResource($round), 'Round ended');
    }
}
