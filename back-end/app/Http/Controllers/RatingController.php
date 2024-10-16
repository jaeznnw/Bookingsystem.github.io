<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ratings;

class RatingController extends Controller
{
    public function index()
    {
        
        $ratings = Ratings::with('typeOfRooms')->get();
        return response()->json(['ok' => true, 'data' => $ratings]);
    }

    /**
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){$validator = validator($request->all(), ["type_of_room_id" => "required|in:1,2,3,4", "rate" => "required|in:1,2,3,4,5", "comment" => "sometimes|string|max:128"]);
    
        if($validator->fails()){
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }
        
        $rating = Ratings::create($validator->validated());

        $rating->typeOfRooms('typeOfRooms');

        $rating->typeOfRooms;

        return response()->json([
            'ok' => true,
            'message' => "Rate has been submitted!",
            'data' => $rating
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ratings $rating){$validator = validator($request->all(), ["type_of_room_id" => "required|in:1,2,3,4", "rate" => "required|in:1,2,3,4,5", "comment" => "sometimes|string|max:128"]);

        if($validator->fails()){
            return response()->json(["ok" => false,"message" => "Request didn't pass the validation.","errors" => $validator->errors()], 400);}
            
            $rating->update($validator->validated());

            $rating->load('typeOfRooms');

            $rating->typeOfRooms;
    
            return response()->json([
                'ok' => true,
                'message' => "Rate has been updated!",
                'data' => $rating
            ], 200);
    
        }

    /**
     *
     * @param  \App\Models\Ratings  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ratings $rating){
    
        $rating->delete();

        return response()->json([
            "ok" => true,
            "message" => "Rate has been deleted."
        ], 200);

    }

}
