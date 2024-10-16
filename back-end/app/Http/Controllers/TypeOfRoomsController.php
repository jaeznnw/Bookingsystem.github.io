<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeOfRooms;

class TypeOfRoomsController extends Controller
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
            "data" => typeofRooms::all()
        ], 200);

    }


    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            "name" => "min:3|string|required",
            "description" => "required|string|max:128",
            "prices_per_hour" => "required|numeric"
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }
    
    
        $type_input = TypeOfRooms::create($validator->validated());

    
        return response()->json([
            'ok' => true,
            'message' => "Type of Room  has been created!",
            'data' => $type_input
        ], 201);
    }
        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TypeOfRooms $type_input)
    {


        $validator = validator($request->all(), [
            "name" => "min:3|string|required",
            "description" => "required|string|max:128",
            "prices_per_hour" => "required|numeric"
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }

        $type_input->update($validator->validated());

        

        return response()->json([
            'ok' => true,
            'message' => "Room has been updated!",
            'data' => $type_input   
        ], 200);
    }

    /**
     *
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(TypeOfRooms $type_input){
    
        $type_input->delete();

        return response()->json([
            "ok" => true,
            "message" => "Room has been deleted."
        ], 200);

    }

}
