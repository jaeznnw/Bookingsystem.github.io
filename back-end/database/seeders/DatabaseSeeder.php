<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'password' => Hash::make('123456789'),
            'email' => 'admin@gmail.com',
            'role' => 'admin',
        ]);
    }
}
// 'first_name' => 'Will',
// 'middle_name' => 'bolofer',
// 'last_name' => 'Adornado',
