<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\WelcomeMail;

use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    /**
     *Creates a user data from request
     *POST: /api/users
     *@param Request
     *@return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = validator($request->all(),
            ["name" => "required|min:4|string|unique:users|max:16|alpha_dash",
                "email" => "required|email|max:64|unique:users",
                "password" => "required|min:8|max:32|string|confirmed",
                "first_name" => "required|string|min:2",
                "middle_name" => "sometimes|string|min:1",
                "last_name" => "required|string|min:2",
                "birth_date" => "required|date"]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors(),
            ], 400);
        }

        $user_input = $validator->safe()->only(["name", "email", "password"]);
        $profile_input = $validator->safe()->except(["name", "email", "password"]);

        $user = User::create($user_input);

        $user->profile()->create($profile_input);

        $user->profile;
        $user->token = $user->createToken("registration_token")->accessToken;

        Mail::to($user->email)->send(new WelcomeMail($user));

        return response()->json([
            'ok' => true,
            'message' => "User has been created!",
            'data' => $user,
        ], 201);
    }

/**
 *POST: /api/login
 *@param Request
 *@param \Illuminate\Http\Response
 *@return \Illuminate\Http\Response
 */
    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'name' => "required",
            'password' => "required",
        ]);
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation",
                "errors" => $validator->errors(),
            ], 400);
        }
        if (!auth()->attempt($validator->validated())) {
            return response()->json([
                "ok" => false,
                "message" => "Invalid Credentials!",
            ], 401);
        }

        $user = auth()->user();
        $user->profile;
        $user->token = $user->createToken("login-token")->accessToken;

        return response()->json([
            "ok" => true,
            "message" => "Login Sucessfully",
            "data" => $user,
        ]);
    }

    public function checkToken(Request $request)
    {
        $user = $request->user();
        $user->profile;
        return response()->json([
            "ok" => true,
            "message" => "User Info has been retrieved",
            "data" => $request->user(),
        ], 200);
    }
}
