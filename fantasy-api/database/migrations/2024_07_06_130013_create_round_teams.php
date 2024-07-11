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
        Schema::create('round_teams', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('round_id');
            $table->unsignedBigInteger('team_id');
            $table->unsignedBigInteger('user_team_id');
            $table->unsignedBigInteger('player_id');
            $table->integer('points');
            $table->foreign('round_id')->references('id')->on('rounds');
            $table->foreign('team_id')->references('id')->on('teams');
            $table->foreign('user_team_id')->references('id')->on('user_teams');
            $table->foreign('player_id')->references('id')->on('players');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('round_teams');
    }
};
