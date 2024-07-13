<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRoundTeamResource extends JsonResource
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
            'round' => new RoundResource($this->round),
            'user_team' => new UserTeamResource($this->userTeam),
            'player' => new PlayerResource($this->player),
            'points' => $this->points
        ];
    }
}
