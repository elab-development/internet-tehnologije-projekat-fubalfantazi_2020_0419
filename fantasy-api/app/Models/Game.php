<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'game_date',
        'team_home_id',
        'team_away_id',
        'round_id',
        'game_score_home',
        'game_score_away',
    ];

    public function teamHome()
    {
        return $this->belongsTo(Team::class, 'team_home');
    }

    public function teamAway()
    {
        return $this->belongsTo(Team::class, 'team_away');
    }

    public function round()
    {
        return $this->belongsTo(Round::class);
    }

}
