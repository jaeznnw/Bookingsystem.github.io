<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeOfRooms extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'description',
        'prices_per_hour'
    ];
    
    public function rooms(){
        return $this -> hasOne(Rooms::class);
    }

    public function ratings(){
        return $this -> hasMany(Ratings::class, 'type_of_room_id');
    }

}
