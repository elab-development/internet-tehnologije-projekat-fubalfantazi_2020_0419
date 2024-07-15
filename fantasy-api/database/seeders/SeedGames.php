<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedGames extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $teams = \App\Models\Team::all();

        $rounds = \App\Models\Round::all();

        $games = [];

        //all teams play once per round

        foreach ($rounds as $round) {
            $teams = $teams->shuffle();
            $teamCount = $teams->count();
            $half = $teamCount / 2;
            $homeTeams = $teams->slice(0, $half);
            $awayTeams = $teams->slice($half, $half);

            for ($i = 0; $i < $half; $i++) {
                $games[] = [
                    'round_id' => $round->id,
                    'team_home_id' => $homeTeams[$i]->id,
                    'team_away_id' => $awayTeams[$i+10]->id,
                    'game_score_home' => $faker->numberBetween(0, 5),
                    'game_score_away' => $faker->numberBetween(0, 5),
                    'game_date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d H:i:s'),
                ];
            }
        }

        \App\Models\Game::insert($games);


    }
}
