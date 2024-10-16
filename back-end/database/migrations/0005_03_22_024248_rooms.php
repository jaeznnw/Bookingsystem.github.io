<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('room_type_id');
            $table->BigInteger('room_number');
            $table->tinyInteger('status')->default(1); // we change our db default status into 0 as empty
            $table->foreign('room_type_id')->references('id')->on('type_of_rooms')->onDelete('cascade');
            $table->timestamps();
        });

        DB::table('rooms')->insert([
            ['room_number' => '101', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '102', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '103', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '104', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '105', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '106', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '107', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '108', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '109', 'room_type_id' => '3', 'status' => 1],
            ['room_number' => '110', 'room_type_id' => '4', 'status' => 1],
            ['room_number' => '201', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '202', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '203', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '204', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '205', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '206', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '207', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '208', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '209', 'room_type_id' => '3', 'status' => 1],
            ['room_number' => '210', 'room_type_id' => '4', 'status' => 1],
            ['room_number' => '301', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '302', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '303', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '304', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '305', 'room_type_id' => '1', 'status' => 1],
            ['room_number' => '306', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '307', 'room_type_id' => '2', 'status' => 1],  
            ['room_number' => '308', 'room_type_id' => '2', 'status' => 1],
            ['room_number' => '309', 'room_type_id' => '3', 'status' => 1],
            ['room_number' => '310', 'room_type_id' => '4', 'status' => 1]
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');

    }
};
