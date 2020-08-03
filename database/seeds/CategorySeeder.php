<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {	
    	$icon = ['asus.png', 'acer.png', 'hp.png', 'apple.png', 'razer.png', 'rexus.png'];
    	$category = ['ASUS', 'ACER', 'HP', 'Apple', 'Razer', 'Rexus'];
    	$slug = ['asus', 'acer','hp', 'apple', 'razer', 'rexus'];
    	for ($i = 0; $i < 6; $i++) {
    		Category::create([
				'icon' => $icon[$i],
				'category' => $category[$i],
				'section' => 'brand',
				'slug' => $slug[$i],
	        ]);
    	}
    }
}
