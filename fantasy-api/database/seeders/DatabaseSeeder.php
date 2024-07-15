<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory()->create([
            'name' => 'Admin user',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

         \App\Models\User::factory(10)->create();

         $this->call([
            SeedLeague::class,
            SeedTeams::class,
            SeedPlayers::class,
            SeedRounds::class,
            SeedLeagueMembers::class,
             SeedGames::class
        ]);

    }
}
