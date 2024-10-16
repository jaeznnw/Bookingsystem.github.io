<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;
use App\Models\Booking;
use App\Mail\BookingMail;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    /**
     * Retrieve all bookings
     * GET: /api/bookings
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            "ok" => true,
            "message" => "All Book list has been retrieved.",
            "data" => Booking::with("profile", "rooms")->get()
        ], 200);
    }

    /**
     * Store a new booking
     * POST: /api/bookings
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            "profile_id" => "exists:profiles,user_id|required",
            "room_id" => "exists:rooms,id|required",
            "payment_type" => "required|in:0,1,2",
            "payment_status" => "required|in:0,1,2,3",
            "check_in_date" => "required|date|after_or_equal:today",
            "check_out_date" => "required|date|after:check_in_date"
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }
    
        $existingBooking = Booking::where('room_id', $request->room_id)
                                  ->where(function ($query) use ($request) {
                                      $query->whereBetween('check_in_date', [$request->check_in_date, $request->check_out_date])
                                            ->orWhereBetween('check_out_date', [$request->check_in_date, $request->check_out_date])
                                            ->orWhere(function ($query) use ($request) {
                                                $query->where('check_in_date', '<=', $request->check_in_date)
                                                      ->where('check_out_date', '>=', $request->check_out_date);
                                            });
                                  })
                                  ->exists();
    
        if ($existingBooking) {
            return response()->json([
                "ok" => false,
                "message" => "Room is already booked by this date."
            ], 400);
        }
    
        $booking = Booking::create($validator->validated());
    
        $booking->load('profile', 'rooms');
    
        $profile = Profile::find($request->profile_id);
    
        Mail::to($profile->user->email)->send(new BookingMail($booking));
    
        return response()->json([
            'ok' => true,
            'message' => "Booked Successfully",
            'data' => $booking
        ], 201);
    }
    

    /**
     * Update the specified booking
     * PUT/PATCH: /api/bookings/{booking}
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Booking $booking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Booking $booking)
    {
        $validator = validator($request->all(), [
            "profile_id" => "exists:profiles,user_id",
            "room_id" => "exists:rooms,id|required",
            "payment_type" => "required|in:0,1,2",
            "payment_status" => "required|in:0,1,2,3",
            "check_in_date" => "required|date|after_or_equal:today",
            "check_out_date" => "required|date|after:check_in_date",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "message" => "Request didn't pass the validation.",
                "errors" => $validator->errors()
            ], 400);
        }

        $existingBooking = Booking::where('room_id', $request->room_id)
                                  ->where('check_in_date', $request->check_in_date)
                                  ->where('id', '!=', $booking->id)
                                  ->first();

        if ($existingBooking) {
            return response()->json([
                "ok" => false,
                "message" => "Room is already booked on the selected date."
            ], 400); 
        }

        $booking->update($validator->validated());

        $booking->load('profile', 'rooms');

        return response()->json([
            'ok' => true,
            'message' => "Book has been updated!",
            'data' => $booking
        ], 200);
    }

    /**
     * Remove the specified booking from storage.
     * DELETE: /api/bookings/{booking}
     * @param \App\Models\Booking $booking
     * @return \Illuminate\Http\Response
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json([
            "ok" => true,
            "message" => "Book has been deleted."
        ], 200);
    }
}