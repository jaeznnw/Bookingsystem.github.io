<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'user_id';
    protected $guarded = [];
    
    public function user(){
        return $this ->belongsTo(User::class);
    
    }

    public function booking(){
        return $this -> hasMany(Booking::class);
    }

    
}
