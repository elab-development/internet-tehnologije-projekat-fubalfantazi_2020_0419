<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeagueResource extends JsonResource
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
            'league_name' => $this->league_name,
            'league_short' => $this->league_short,
            'members' => LeagueMemberResource::collection($this->leagueMembers)
        ];
    }
}
