<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;

    protected $fillable=[
        'id',
        'room_type_id',
        'room_number',
        'status',
    ];

    

    public function booking(){
        return $this -> hasOne(Booking::class);
    }

    public function typeOfRooms(){
        return $this -> belongsTo(TypeOfRooms::class, 'room_type_id');
    }

}   
