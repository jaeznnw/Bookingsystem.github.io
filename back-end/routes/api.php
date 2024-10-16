<?php

use Illuminate\Support\Facades\Route;

Route::prefix("users")->group(function () {
    // POST: C
    Route::post("/", [App\Http\Controllers\UserController::class, 'store']);
    // GET: http://localhost:8000/api/users
    Route::get("/", [App\Http\Controllers\UserController::class, 'index']);
    // GET: http://localhost:8000/api/users/%7Buser%7D
    Route::get("/{user}", [App\Http\Controllers\UserController::class, 'show']);
    // PATCH: http://localhost:8000/api/users/%7Buser%7D
    Route::patch("/{user}", [App\Http\Controllers\UserController::class, 'update']);
    // PATCH: http://localhost:8000/api/users/%7Buser%7D
    Route::patch("/{user}/updatePassword", [App\Http\Controllers\UserController::class, 'updatePassword']);
    // DELETE: http://localhost:8000/api/users/%7Buser%7D
    Route::delete("/{user}", [App\Http\Controllers\UserController::class, 'destroy']);
});

Route::prefix("ratings")->group(function () {
    // POST: C
    Route::post("/", [App\Http\Controllers\RatingController::class, 'store']);
    // GET: http://localhost:8000/api/users
    Route::get("/", [App\Http\Controllers\RatingController::class, 'index']);
    // GET: http://localhost:8000/api/users/%7Buser%7D
    Route::get("/{rating}", [App\Http\Controllers\RatingController::class, 'show']);
    // PATCH: http://localhost:8000/api/users/%7Buser%7D
    Route::patch("/{rating}", [App\Http\Controllers\RatingController::class, 'update']);
    // DELETE: http://localhost:8000/api/users/%7Buser%7D
    Route::delete("/{rating}", [App\Http\Controllers\RatingController::class, 'destroy']);
});

// POST: http://localhost:8000/api/login
Route::post("/register", [App\Http\Controllers\AuthController::class, 'register']);
Route::post("/login", [App\Http\Controllers\AuthController::class, 'login']);
Route::post("/contact", [App\Http\Controllers\ContactController::class, 'send']);

Route::middleware("auth:api")->get("/checkToken", [App\Http\Controllers\AuthController::class, 'checkToken']);

Route::prefix("booking")->group(function () {
    Route::post("/", [App\Http\Controllers\BookingController::class, 'store']);
    Route::get("/", [App\Http\Controllers\BookingController::class, 'index']);
    Route::patch("/{booking}", [App\Http\Controllers\BookingController::class, 'update']);
    Route::delete("/{booking}", [App\Http\Controllers\BookingController::class, 'destroy']);
});

//POST: https://localhost:8000/api/room
Route::prefix("rooms")->group(function () {

    Route::post("/", [App\Http\Controllers\RoomController::class, 'store']);
    Route::get("/", [App\Http\Controllers\RoomController::class, 'index']);
    Route::patch("/{room_input}", [App\Http\Controllers\RoomController::class, 'update']);
    Route::delete("/{room_input}", [App\Http\Controllers\RoomController::class, 'destroy']);

});

//POST: https://localhost:8000/api/typeOfRooms
Route::prefix("typeOfRooms")->group(function () {

    Route::post("/", [App\Http\Controllers\TypeOfRoomsController::class, 'store']);
    Route::get("/", [App\Http\Controllers\TypeOfRoomsController::class, 'index']);
    Route::patch("/{type_input}", [App\Http\Controllers\TypeOfRoomsController::class, 'update']);
    Route::delete("/{type_input}", [App\Http\Controllers\TypeOfRoomsController::class, 'destroy']);

});


  