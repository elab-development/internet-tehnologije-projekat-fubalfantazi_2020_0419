<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTeamPlayers extends Model
{
    use HasFactory;

    protected $table = 'user_team_players';

    protected $fillable = [
        'user_team_id',
        'player_id',
        'position'
    ];

    public function userTeam()
    {
        return $this->belongsTo(UserTeam::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
