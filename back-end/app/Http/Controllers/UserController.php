<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Creates a user data from request
     * POST: /api/users
     * @param Request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            "name" => "required|min:4|string|unique:users",
            "email" => "required|email|max:64|unique:users",
            "password" => "required|min:8|max:32|string|confirmed",
            "first_name" => "required|string|min:2",
            "middle_name" => "sometimes|string|min:1",
            "last_name" => "required|string|min:2",
            "birth_date" => "required|date",
            "role" => "sometimes|in:user,admin"
        ]);

        //error 400, response status code, 200 (ok) 201 (created) 400 (bad request/client error)

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors(),
            ], 400);
        }

        $user_input = $validator->safe()->only(["name", "email", "password","role"]);
        $profile_input = $validator->safe()->except(["name", "email", "password","role"]);

        $user = User::create($user_input);
        $user->profile()->create($profile_input);
        $user->profile;

        return response()->json([
            'ok' => true,
            'message' => "Account has been created!",
            'data' => $user,
        ], 201);
    }

    /**
     * Retrieve all users
     * GET: /api/users
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            "ok" => true,
            "message" => "All user has been retrieved.",
            "data" => User::with("profile")->get(),
        ], 200);
    }

    /**
     * Retrieve specific user using ID
     * GET: /api/users/{user}
     * GET: /api/users/1
     * @param User
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->profile;
        return response()->json([
            "ok" => true,
            "message" => "User has been retrieved.",
            "data" => $user,
        ], 200);
    }

    /**
     * Update a specified user using ID and Request
     * PATCH: /api/users/{user}
     * @param Request
     * @param User
     * @return \Illuminate\Http\Response
     */public function update(Request $request, User $user)
{
    $validator = validator($request->all(), [
        
        "email" => "required|email|max:64|unique:users,email,".$user->id,
        "first_name" => "required|string|min:2",
        "middle_name" => "sometimes",
        "last_name" => "required|string|min:2",
        "birth_date" => "required|date",
        "role" => "sometimes|in:user,admin",
    ]);

    if ($validator->fails()) {
        return response()->json([
            "ok" => false,
            "message" => "Request didn't pass the validation.",
            "errors" => $validator->errors(),
        ], 400);
    }

    $user_input = $validator->safe()->only(["email"]);
    $profile_input = $validator->safe()->except(["email", "role"]);

    $user->update($user_input);

    if ($request->has('role')) {
        $user->role = $request->input('role');
        $user->save();
    }

    $user->profile()->update($profile_input);
    $user->profile;

    return response()->json([
        'ok' => true,
        'message' => "User has been updated!",
        'data' => $user,
    ], 200);
}


    /**
     * Delete specific user using ID
     * DELETE: /api/users/{user}
     * DELETE: /api/users/1
     * @param User
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            "ok" => true,
            "message" => "User has been deleted.",
        ], 200);
    }
}
