<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	// ASUS
    	$asusProduct = [
    		'Asus Zenbook',
    		'ASUS Zenbook Duo',
    		'ASUS Zenbook Pro',
    		'ASUS ROG STRIX II',
    		'ASUS ROG',
    		'ASUS Vivobook Pro',
    		'Asus Vivobook',
    		'ASUS Tuf'
    	];
    	$asusPrice = [
    		8998000,
    		25899000,
    		20499000,
    		24999900,
    		18999900,
    		15988000,
    		9899000,
    		15899000
    	];
    	for ($i = 0; $i < 8; $i++) {
    		Product::create([
    			'product_name' => $asusProduct[$i],
    			'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
    			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
    			'product_price' => $asusPrice[$i],
    			'product_image' => 'ASUS_' . $i+1 . '.png',
    		])->category()->attach(1);
    	}

    	// ACER
    	Product::create([
    		'product_name' => 'ACER Predator',
    		'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
    		'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
    		'product_price' => 20899000,
    		'product_image' => 'ACER_1.png'
    	])->category()->attach(2);

    	// HP
    	$hpProduct = [
    		'HP Spectre x360',
    		'HP Omen',
    		'HP Pavillion'
    	];
    	$hpPrice = [
    		14599000,
    		18999000,
    		14899000
    	];
    	for ($i = 0; $i < 3; $i++) {
    		Product::create([
    			'product_name' => $hpProduct[$i],
    			'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
    			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
    			'product_price' => $hpPrice[$i],
    			'product_image' => 'HP_' . $i+1 . '.png'
    		])->category()->attach(3);
    	}

    	// APPLE
    	Product::create([
			'product_name' => 'Macbook Air 2020',
			'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
			'product_price' => 18998000,
			'product_image' => 'MAC_1.png'
    	])->category()->attach(5);

    	// RAZER
    	Product::create([
			'product_name' => 'Mac Mini 2020',
			'product_description' => 'A lightweight processor for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
			'product_price' => 25499000,
			'product_image' => 'MACMINI_1.png'
    	])->category()->attach(5);

    	Product::create([
    		'product_name' => 'Razer Dragon',
			'product_description' => 'A lightweight mouse for gamer with anti slippery technology and full gaming button for gaming experience.',
			'product_spec' => '<ul><li>RGB Mouse</li><li>Full gaming experience button</li></ul>',
			'product_price' => 1599000,
			'product_image' => 'RAZER_2.png'
    	])->category()->attach(5);

    	// REXUS
    	Product::create([
    		'product_name' => 'Rexus Battlefire',
			'product_description' => 'A lightweight keyboard for gamer with butterfly tactical technology, and anti blur text.',
			'product_spec' => '<ul><li>100% RGB</li><li>Anti blur text</li><li>Butterfly tactical technology</li><li>Anti slippery</li></ul>',
			'product_price' => 599000,
			'product_image' => 'REXUS_1.png'
    	])->category()->attach(6);

    	Product::create([
    		'product_name' => 'Rexus K2',
			'product_description' => 'A lightweight keyboard for gamer with butterfly tactical technology, and anti blur text.',
			'product_spec' => '<ul><li>100% RGB</li><li>Anti blur text</li><li>Butterfly tactical technology</li><li>Anti slippery</li></ul>',
			'product_price' => 299000,
			'product_image' => 'REXUS_2.png'
    	])->category()->attach(6);

    	Product::create([
    		'product_name' => 'Rexus Mouse',
			'product_description' => 'A lightweight mouse with full gaming button experience to boost up your gaming experience.',
			'product_spec' => '<ul><li>100% RGB</li><li>Anti Slippery</li><li>Full Gaming Button</li></ul>',
			'product_price' => 149000,
			'product_image' => 'REXUS_3.png'
    	])->category()->attach(6);
    }
}
