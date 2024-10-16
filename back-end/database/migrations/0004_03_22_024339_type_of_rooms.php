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
        Schema::create('type_of_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Classic');
            $table->string('description')->default('Lorem itsum');
            $table->bigInteger('prices_per_hour')->default(150);  
            $table->timestamps();
        });

        DB::table('type_of_rooms')->insert([
            ['name' => 'Classic', 'description' => 'A cozy room with modern amenities and a comfortable bed.', 'prices_per_hour' => 150],
            ['name' => 'Regular', 'description' => 'A spacious room with premium furnishings and a beautiful view.', 'prices_per_hour' => 300],
            ['name' => 'Deluxe', 'description' => 'An elegant room with luxurious amenities and a hot spring bath.' , 'prices_per_hour' => 500],
            ['name' => 'Vip', 'description' => 'A top-tier room with exclusive services and stunning sea views.', 'prices_per_hour' => 1000]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_of_rooms');

    }
};
