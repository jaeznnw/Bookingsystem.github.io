<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';


    protected $fillable=[
        'check_in_date',
        'check_out_date',
        'profile_id',
        'room_id',
        'payment_type',
        'payment_status'

    ];
    protected $appends = ['payment_type_name', 'payment_status_name'];

    public function getPaymentTypeNameAttribute()
    {
        $types = [
            0 => 'Gcash',
            1 => 'Cash on Site',
            2 => 'Credit Card'
        ];

        return $types[$this->payment_type] ?? 'Unknown';
    }

    public function getPaymentStatusNameAttribute()
    {
        $statuses = [
            0 => 'Pending',
            1 => 'Paid',
            2 => 'Failed',
            3 => 'Refunded'
        ];

        return $statuses[$this->payment_status] ?? 'Unknown';
    }

    public function profile(){
        return $this -> belongsTo(Profile::class, 'profile_id');
    }
 

    public function rooms(){
        return $this -> belongsTo(Rooms::class, 'room_id');
    }

}
