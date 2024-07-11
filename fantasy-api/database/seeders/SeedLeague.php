<?php

namespace Database\Seeders;

use App\Models\League;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedLeague extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 10; $i++) {
            League::create([
                'league_name' => $faker->company,
                'league_short' => $faker->companySuffix,
            ]);
        }
    }
}
