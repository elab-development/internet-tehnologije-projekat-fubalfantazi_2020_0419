<?php

namespace App\Http\Resources;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameStatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'game_id' => $this->game_id,
            'player_id' => $this->player_id,
            'player_goals' => $this->player_goals,
            'player_assists' => $this->player_assists,
            'player_yellow_cards' => $this->player_yellow_cards,
            'player_red_cards' => $this->player_red_cards,
            'points' => $this->points,
            'player' => new PlayerResource(Player::find($this->player_id)),
        ];
    }
}
