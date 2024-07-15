<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $table = 'players';

    protected $fillable = [
        'player_name',
        'player_position',
        'team_id',
        'player_price'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function gameStats()
    {
        return $this->hasMany(GameStats::class);
    }

    public function userRoundTeams()
    {
        return $this->hasMany(UserRoundTeam::class);
    }
}
