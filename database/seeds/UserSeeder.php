<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	User::create([
    		'role_id' => 1,
    		'name' => 'Admin',
    		'email' => 'admin@store.com',
    		'password' => bcrypt('admin'),
    		'remember_token' => Str::random(10),
    		'avatar' => 'default.png',
    		'is_verified' => 1,
    		'is_subscribe' => 0,
    	]);
    }
}
