<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameStats extends Model
{
    use HasFactory;

    public const GOAL_POINTS_DEF_GK = 6;
    public const GOAL_POINTS_DEF_MF = 5;
    public const GOAL_POINTS_DEF_FW = 4;
    public const ASSIST_POINTS = 3;
    public const YELLOW_CARD_POINTS = -1;
    public const RED_CARD_POINTS = -2;

    protected $table = 'game_stats';

    protected $fillable = [
        'game_id',
        'player_id',
        'player_goals',
        'player_assists',
        'player_yellow_cards',
        'player_red_cards',
        'points'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }


}
