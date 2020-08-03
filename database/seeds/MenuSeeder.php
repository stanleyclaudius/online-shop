<?php

use Illuminate\Database\Seeder;
use App\Menu;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$menu = ['dashboard', 'website', 'product', 'order', 'store control'];
    	for ($i = 0; $i < 5; $i++) {
	        Menu::create([
	        	'menu' => $menu[$i],
	        ]);
        }
    }
}
