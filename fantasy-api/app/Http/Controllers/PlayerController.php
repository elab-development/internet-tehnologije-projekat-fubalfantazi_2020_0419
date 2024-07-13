<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlayerResource;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlayerController extends BaseController
{
    public function index()
    {
        $players = DB::table('players')->join('teams', 'players.team_id', '=', 'teams.id')->select('players.*', 'teams.team_name', 'teams.team_short')->orderBy('players.player_price', 'desc')->get();
        return $this->success($players, 'Players retrieved successfully');
    }

    public function show($id)
    {
        $player = Player::find($id);
        if ($player) {
            return $this->success(new PlayerResource($player), 'Player retrieved successfully');
        }
        return $this->error('Player not found', [], 404);
    }

    public function findByPosition(Request $request, $position)
    {
        $players = Player::where('position', $position)->get();

        return $this->success(PlayerResource::collection($players), 'Players retrieved successfully');
    }

    public function findByTeam(Request $request, $teamId)
    {
        $players = Player::where('team_id', $teamId)->get();

        return $this->success(PlayerResource::collection($players), 'Players retrieved successfully');
    }

    public function paginatePlayers(Request $request)
    {
        $perPage = $request->perPage ? $request->perPage : 30;
        $players = DB::table('players')->join('teams', 'players.team_id', '=', 'teams.id')->select('players.*', 'teams.team_name')->orderBy('players.player_price', 'desc')->paginate($perPage);
        return $this->success($players, 'Players retrieved successfully');
    }
}
