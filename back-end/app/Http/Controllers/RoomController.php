<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rooms;

class RoomController extends Controller
{

    //php artisan passport:client --personal need for migrate://fresh everytime
    /**  
    *Retrieve all users
    *GET: /api/users
    *@return \Illuminate\Http\Response
    */
    public function index(){
        return response()->json([
            "ok" => true,
            "message" => "All Room choice has been retrieved.",
            "data" => Rooms::with("typeOfRooms")->get()
        ], 200);

    }


    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            "type_of_room_id" => "required|in:1,2,3,4",
            "room_number" => "required|min:3|numeric",
            "status" => "required|in:1,2,3"
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }
    
        $validatedData = $validator->validated();
    
        $room_input = Rooms::create([
            'room_type_id' => $validatedData['type_of_room_id'],
            'room_number' => $validatedData['room_number'],
        ]);
    
        $room_input->typeOfRooms('typeOfRooms');

        $room_input->typeOfRooms;
    
        return response()->json([
            'ok' => true,
            'message' => "Room  has been deployed!",
            'data' => $room_input
        ], 201);
    }
        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rooms $room_input)
    {
        $validator = validator($request->all(), [
            "type_of_room_id" => "required|in:1,2,3,4",
            "room_number" => "required|min:3|numeric",
            "status" => "required|in:1,2,3"
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }

        $validatedData = $validator->validated();

        $room_input->update([
            'room_type_id' => $validatedData['type_of_room_id'],
            'room_number' => $validatedData['room_number'],
            'status' => $validatedData['status'],
        ]);


        $room_input->load('typeOfRooms');
    
        return response()->json([
            'ok' => true,
            'message' => "Room has been updated!",
            'data' => $room_input
        ], 200);
    }

    /**
     *
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rooms $room_input){
    
        $room_input->delete();

        return response()->json([
            "ok" => true,
            "message" => "Room has been deleted."
        ], 200);

    }

}


