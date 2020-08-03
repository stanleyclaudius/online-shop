<?php

use Illuminate\Database\Seeder;
use App\Jumbotron;

class JumbotronSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Jumbotron::create([
        	'jumbotron' => 'jumbotron.png',
        ]);
    }
}
