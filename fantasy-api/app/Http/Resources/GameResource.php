<?php

namespace App\Http\Resources;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
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
            'game_date' => $this->game_date,
            'team_home_id' => $this->team_home_id,
            'team_away_id' => $this->team_away_id,
            'round_id' => $this->round_id,
            'game_score_home' => $this->game_score_home,
            'game_score_away' => $this->game_score_away,
            'home' => new TeamResource(Team::find($this->team_home_id)),
            'away' => new TeamResource(Team::find($this->team_away_id)),
        ];
    }
}
