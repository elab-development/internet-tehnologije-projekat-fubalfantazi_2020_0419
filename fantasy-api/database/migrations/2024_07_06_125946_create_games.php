<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('team_home_id');
            $table->unsignedBigInteger('team_away_id');
            $table->unsignedBigInteger('round_id');
            $table->integer('game_score_home');
            $table->integer('game_score_away');
            $table->datetime('game_date');

            $table->foreign('team_home_id')->references('id')->on('teams');
            $table->foreign('team_away_id')->references('id')->on('teams');
            $table->foreign('round_id')->references('id')->on('rounds');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
