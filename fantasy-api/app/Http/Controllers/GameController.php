<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GameController extends BaseController
{
    public function findByRound(Request $request, $roundId)
    {
        $games = Game::where('round_id', $roundId)->get();

        return $this->success(GameResource::collection($games), 'Games found', );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'round_id' => 'required|integer',
            'game_date' => 'required|date',
            'team_home_id' => 'required|integer',
            'team_away_id' => 'required|integer',
            'game_score_home' => 'required|integer',
            'game_score_away' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $game = Game::create($request->all());

        return $this->success(new GameResource($game), 'Game created');
    }
}
