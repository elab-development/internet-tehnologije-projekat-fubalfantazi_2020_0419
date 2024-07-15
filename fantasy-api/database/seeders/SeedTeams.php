<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedTeams extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            ['team_name' => 'Arsenal', 'team_short' => 'ARS'],
            ['team_name' => 'Aston Villa', 'team_short' => 'AVL'],
            ['team_name' => 'Brentford', 'team_short' => 'BRE'],
            ['team_name' => 'Brighton', 'team_short' => 'BHA'],
            ['team_name' => 'Burnley', 'team_short' => 'BUR'],
            ['team_name' => 'Chelsea', 'team_short' => 'CHE'],
            ['team_name' => 'Crystal Palace', 'team_short' => 'CRY'],
            ['team_name' => 'Everton', 'team_short' => 'EVE'],
            ['team_name' => 'Leeds', 'team_short' => 'LEE'],
            ['team_name' => 'Leicester', 'team_short' => 'LEI'],
            ['team_name' => 'Liverpool', 'team_short' => 'LIV'],
            ['team_name' => 'Manchester City', 'team_short' => 'MCI'],
            ['team_name' => 'Manchester United', 'team_short' => 'MUN'],
            ['team_name' => 'Newcastle', 'team_short' => 'NEW'],
            ['team_name' => 'Norwich', 'team_short' => 'NOR'],
            ['team_name' => 'Southampton', 'team_short' => 'SOU'],
            ['team_name' => 'Tottenham', 'team_short' => 'TOT'],
            ['team_name' => 'Watford', 'team_short' => 'WAT'],
            ['team_name' => 'West Ham', 'team_short' => 'WHU'],
            ['team_name' => 'Wolves', 'team_short' => 'WOL'],
        ];

        foreach ($teams as $team) {
            \App\Models\Team::create($team);
        }
    }
}
