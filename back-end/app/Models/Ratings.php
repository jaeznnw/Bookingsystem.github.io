<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate',
        'comment',
        'type_of_room_id',
    ];

    public function typeOfRooms(){
        return $this -> belongsTo(TypeOfRooms::class, 'type_of_room_id');
    }

}
