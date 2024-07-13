<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlayerResource extends JsonResource
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
            'player_name' => $this->player_name,
            'player_position' => $this->player_position,
            'team' => new TeamResource($this->team),
            'player_price' => $this->player_price,
        ];
    }
}
