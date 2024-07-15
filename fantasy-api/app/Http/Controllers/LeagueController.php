<?php

namespace App\Http\Controllers;

use App\Models\League;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LeagueController extends BaseController
{
    public function index()
    {
        $leagues = League::all();
        return $this->success($leagues, 'Leagues retrieved successfully');
    }

    public function show($id)
    {
        $league = League::find($id);
        if ($league) {
            return $this->success($league, 'League retrieved successfully');
        }
        return $this->error('League not found', [], 404);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'league_name' => 'required|string',
            'league_short' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->err('Validation Error', $validator->errors());
        }

        $league = League::create($request->all());
        return $this->success($league, 'League created successfully', 201);
    }

    public function update(Request $request, $id)
    {
        $league = League::find($id);
        if (!$league) {
            return $this->error('League not found', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'league_name' => 'required|string',
            'league_short' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $league->update($request->all());
        return $this->success($league, 'League updated successfully');
    }

    public function destroy($id)
    {
        $league = League::find($id);
        if (!$league) {
            return $this->error('League not found', [], 404);
        }

        $leagueMembers = $league->leagueMembers;

        foreach ($leagueMembers as $leagueMember) {
            $leagueMember->delete();
        }

        $league->delete();
        return $this->success($league, 'League deleted successfully');
    }

    public function findLeaguesByUser(Request $request, $id)
    {

        $leagues = DB::table('leagues')
            ->join('league_members', 'leagues.id', '=', 'league_members.league_id')
            ->where('league_members.user_team_id', $id)
            ->select('leagues.*')
            ->get();

        return $this->success($leagues, 'User leagues retrieved successfully');

    }

    public function findLeaguesAvailableToJoin(Request $request, $id)
    {
        $leagues = DB::table('leagues')
            ->join('league_members', 'leagues.id', '=', 'league_members.league_id')
            ->where('league_members.user_team_id', '!=', $id)
            ->select('leagues.*')
            ->get();

        return $this->success($leagues, 'User leagues available to join retrieved successfully');
    }

}
