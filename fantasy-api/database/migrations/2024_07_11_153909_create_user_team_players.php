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
        Schema::create('user_team_players', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_team_id');
            $table->unsignedBigInteger('player_id');
            $table->integer('position');
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
        Schema::dropIfExists('user_team_players');
    }
};
