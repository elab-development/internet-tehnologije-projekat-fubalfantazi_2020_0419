<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class League extends Model
{
    use HasFactory;

    protected $table = 'leagues';

    protected $fillable = [
        'league_name',
        'league_short',
    ];

    //members

    public function leagueMembers()
    {
        return $this->hasMany(LeagueMembers::class);
    }
}
