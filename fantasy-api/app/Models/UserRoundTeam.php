<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRoundTeam extends Model
{
    use HasFactory;

    protected $table = 'round_teams';

    protected $fillable = [
        'round_id',
        'user_team_id',
        'player_id',
        'points'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function round()
    {
        return $this->belongsTo(Round::class);
    }

    public function userTeam()
    {
        return $this->belongsTo(UserTeam::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
