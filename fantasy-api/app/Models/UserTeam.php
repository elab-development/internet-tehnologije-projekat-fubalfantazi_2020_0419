<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTeam extends Model
{
    use HasFactory;

    public const BUDGET = 100;

    protected $table = 'user_teams';

    protected $fillable = [
        'user_id',
        'team_name',
        'total_points'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function userRoundTeams()
    {
        return $this->hasMany(UserRoundTeam::class);
    }

    public function leagueMembers()
    {
        return $this->hasMany(LeagueMembers::class);
    }

    public function userTeamPlayers()
    {
        return $this->hasMany(UserTeamPlayers::class);
    }

    public function recalculateTotalPoints()
    {
        $allUserRoundTeams = UserRoundTeam::where('user_team_id', $this->id)->get();

        $totalPoints = 0;

        foreach ($allUserRoundTeams as $userRoundTeam) {
            $totalPoints += $userRoundTeam->points;
        }

        $this->total_points = $totalPoints;
        $this->save();
    }
}

