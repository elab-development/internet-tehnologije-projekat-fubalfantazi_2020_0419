<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserTeamResource;
use App\Models\User;
use App\Models\UserTeam;
use App\Models\UserTeamPlayers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    //login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->error('Unauthorized', [], 401);
        }
        $user = auth()->user();
        $userId = Auth::id();
        $token = $user->createToken('authToken')->plainTextToken;

        $userTeam = UserTeam::where('user_id', $userId)->get()->first();

        if (!$userTeam) {
            $userTeam = new UserTeam();
            $userTeam->user_id = $userId;
            $userTeam->team_name = $user->name . " Team";
            $userTeam->total_points = 0;
            $userTeam->save();
        }

        $players = UserTeamPlayers::where('user_team_id', $userTeam->id)->get();

        $madeTeam = $players->count() > 0;

        return $this->success([
            'token' => $token,
            'user' => new UserResource($user),
            'userTeam' => new UserTeamResource($userTeam),
            'madeTeam' => $madeTeam
        ], 'Logged in successfully');
    }

    //register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors(), 422);
        }

        $user = new User();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->role = 'user';
        $user->save();

        $userTeam = new UserTeam();
        $userTeam->user_id = $user->id;
        $userTeam->team_name = $request->name . " Team";
        $userTeam->total_points = 0;
        $userTeam->save();


        return $this->success([
            'user' => new UserResource($user),
            'team' => new UserTeamResource($userTeam)
        ], 'User created successfully', 201);
    }

    public function usersWithRoleUser(Request $request)
    {
        $users = User::where('role', 'user')->get();
        return $this->success(UserResource::collection($users), 'Users with role user retrieved successfully');
    }

    public function changeToModerator(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }

        $user = User::find($request->user_id);

        if (!$user) {
            return $this->error('User not found', [], 404);
        }

        $user->role = 'moderator';
        $user->save();

        return $this->success(new UserResource($user), 'User role changed to moderator');
    }
}
