<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends BaseController
{
    public function index()
    {
        $teams = Team::all();
        return $this->success(TeamResource::collection($teams), 'Teams retrieved successfully');
    }

    public function show($id)
    {
        $team = Team::find($id);
        if ($team) {
            return $this->success(new TeamResource($team), 'Team retrieved successfully');
        }
        return $this->error('Team not found', [], 404);
    }
}
