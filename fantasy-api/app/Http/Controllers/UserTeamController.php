<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\UserTeam;
use App\Models\UserTeamPlayers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserTeamController extends BaseController
{
    public function createTeam(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'player1' => 'required|integer',
            'player2' => 'required|integer',
            'player3' => 'required|integer',
            'player4' => 'required|integer',
            'player5' => 'required|integer',
            'player6' => 'required|integer',
            'player7' => 'required|integer',
            'player8' => 'required|integer',
            'player9' => 'required|integer',
            'player10' => 'required|integer',
            'player11' => 'required|integer',
            'user_team_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $id = $request->user_team_id;

        $userTeam = UserTeam::find($id);

        if (!$userTeam) {
            return $this->error('User Team not found', [], 404);
        }

        $playerIds = [
            $request->player1,
            $request->player2,
            $request->player3,
            $request->player4,
            $request->player5,
            $request->player6,
            $request->player7,
            $request->player8,
            $request->player9,
            $request->player10,
            $request->player11,
        ];

        $players = Player::findMany($playerIds);

        $totalCost = 0;

        foreach ($players as $player) {
            $totalCost += $player->player_price;
        }

        if ($totalCost > UserTeam::BUDGET) {
            return $this->error('Budget exceeded', [], 400);
        }

        foreach ($playerIds as $index => $player) {
            UserTeamPlayers::create([
                'user_team_id' => $id,
                'player_id' => $player,
                'position' => $index + 1,
            ]);
        }

        return $this->success([],'Team created successfully');
    }

    public function getTeam($id)
    {
        $userTeam = UserTeam::find($id);

        if (!$userTeam) {
            return $this->error('User Team not found', [], 404);
        }

        $players = UserTeamPlayers::where('user_team_id', $id)->with('player')->get();

        return $this->success($players);
    }

    public function transfer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'player1' => 'required|integer',
            'player2' => 'required|integer',
            'user_team_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $id = $request->user_team_id;

        $userTeam = UserTeam::find($id);

        if (!$userTeam) {
            return $this->error('User Team not found', [], 404);
        }

        $player1 = Player::find($request->player1);
        $player2 = Player::find($request->player2);


        if (!$player1 || !$player2) {
            return $this->error('Player not found', [], 404);
        }

        if ($player1->player_position !== $player2->player_position) {
            return $this->error('Players have to have the same position', [], 400);
        }

        $player1Position = UserTeamPlayers::where('user_team_id', $id)->where('player_id', $player1->id)->first();

        if (!$player1Position) {
            return $this->error('Player not found in team', [], 404);
        }

        $totalCost = 0;

        $players = UserTeamPlayers::where('user_team_id', $id)->get();

        foreach ($players as $player) {
            if ($player->player_id === $player1->id) {
                $totalCost += $player2->player_price;
            } else {
                $totalCost += $player->player->player_price;
            }
        }

        if ($totalCost > UserTeam::BUDGET) {
            return $this->error('Budget exceeded', [], 400);
        }

        $player1Position->player_id = $player2->id;

        $player1Position->save();

        return $this->success([],'Player transferred successfully');
    }
}
