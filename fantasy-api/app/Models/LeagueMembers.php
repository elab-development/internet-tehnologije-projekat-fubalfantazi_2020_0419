<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeagueMembers extends Model
{
    use HasFactory;

    protected $table = 'league_members';

    protected $fillable = [
        'league_id',
        'user_team_id',
    ];

    public function league()
    {
        return $this->belongsTo(League::class);
    }

    public function userTeam()
    {
        return $this->belongsTo(UserTeam::class);
    }
}
