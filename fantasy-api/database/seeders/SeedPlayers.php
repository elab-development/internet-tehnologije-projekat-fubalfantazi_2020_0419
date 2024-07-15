<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedPlayers extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $teams = \App\Models\Team::all();

       $positons = [
           'GK' => 2,
           'DF' => 5,
           'MF' => 5,
           'FW' => 3,
       ];

       $faker = \Faker\Factory::create();

       $priceRange = [
           'GK' => [5, 7],
           'DF' => [5.5, 8],
           'MF' => [7, 13],
           'FW' => [8, 15],
       ];

         foreach ($teams as $team) {
              $players = [];
              foreach ($positons as $position => $count) {
                for ($i = 0; $i < $count; $i++) {
                     $players[] = [
                          'team_id' => $team->id,
                          'player_name' => $faker->name,
                          'player_position' => $position,
                          'player_price' => $faker->randomFloat(2, $priceRange[$position][0], $priceRange[$position][1]),
                     ];
                }
              }
              \App\Models\Player::insert($players);
         }


    }
}
