<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeagueMemberResource;
use App\Models\LeagueMembers;
use Illuminate\Http\Request;

class LeagueMemberController extends BaseController
{
    public function findByLeague(Request $request, $leagueId)
    {
        $members = LeagueMembers::where('league_id', $leagueId)->get();

        return $this->success(LeagueMemberResource::collection($members), 'League members retrieved successfully');
    }


}
