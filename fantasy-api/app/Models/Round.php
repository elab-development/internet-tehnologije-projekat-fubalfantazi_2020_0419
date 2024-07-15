<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Round extends Model
{
    use HasFactory;

    public const STATUS_ACTIVE = 'active';
    public const STATUS_PENDING = 'pending';
    public const STATUS_ENDED = 'ended';

    protected $table = 'rounds';

    protected $fillable = [
        'round_number',
        'round_name',
        'status'
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function userRoundTeam()
    {
        return $this->hasMany(UserRoundTeam::class);
    }
}
