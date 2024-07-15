<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameStatController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\LeagueMemberController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\RoundController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserTeamController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('teams', [TeamController::class, 'index']);
Route::get('teams/{id}', [TeamController::class, 'show']);
//rounds
Route::get('rounds', [RoundController::class, 'index']);
Route::get('rounds/{id}', [RoundController::class, 'show']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('leagues', [LeagueController::class, 'index']);

//players
Route::get('players', [PlayerController::class, 'index']);
Route::get('players/{id}', [PlayerController::class, 'show']);
Route::get('players/position/{position}', [PlayerController::class, 'findByPosition']);
Route::get('players/team/{teamId}', [PlayerController::class, 'findByTeam']);
Route::get('pagination', [PlayerController::class, 'paginatePlayers']);

Route::middleware('auth:sanctum')->group(function () {
    //user leagues
    //available leagues
    Route::get('user-leagues/{id}', [LeagueController::class, 'findLeaguesByUser']);
    Route::get('available-leagues/{id}', [LeagueController::class, 'findLeaguesAvailableToJoin']);

    //league members
    Route::get('league-members/{leagueId}', [LeagueMemberController::class, 'findByLeague']);
    Route::apiResource('leagues', LeagueController::class)->only(['destroy', 'store', 'update']);

    //create team
    Route::post('create-team', [UserTeamController::class, 'createTeam']);
    Route::get('user-teams-players/{id}', [UserTeamController::class, 'getTeam']);
    Route::post('transfer', [UserTeamController::class, 'transfer']);

    Route::get('games/{roundId}', [GameController::class, 'findByRound']);

    //game stats
    Route::get('game-stats/{gameId}', [GameStatController::class, 'findStatsByGame']);
    Route::post('game-stats', [GameStatController::class, 'store']);

    //start round
    Route::post('start-round', [RoundController::class, 'startRound']);
    Route::post('end-round', [RoundController::class, 'endRound']);

    Route::get('active-round', [RoundController::class, 'findActiveRound']);
    Route::get('ended-rounds', [RoundController::class, 'findEndedRounds']);
    Route::get('points-per-round/{roundId}', [RoundController::class, 'playerPointsPerRound']);
    Route::get('user-team', [UserTeamController::class, 'getUserTeam']);

    Route::get('users', [AuthController::class, 'usersWithRoleUser']);
    Route::post('assign-moderator', [AuthController::class, 'changeToModerator']);

    Route::post('grafik', [UserTeamController::class, 'totalPointsPerPlayerInATeam']);
});
