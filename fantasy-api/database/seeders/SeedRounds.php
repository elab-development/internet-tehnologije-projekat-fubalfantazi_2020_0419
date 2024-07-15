<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedRounds extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 38; $i++) {
            \App\Models\Round::create([
                'round_number' => $i,
                'round_name' => 'Round ' . $i,
                'status' => \App\Models\Round::STATUS_PENDING
            ]);
        }
    }
}
