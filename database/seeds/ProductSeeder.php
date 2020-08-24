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
        Product::create([
            'product_name' => 'ASUS Zenbook',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 8998000,
            'product_image' => 'ASUS_1.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS Zenbook Duo',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 25899000,
            'product_image' => 'ASUS_2.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS Zenbook Pro',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 20499000,
            'product_image' => 'ASUS_3.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS ROG STRIX II',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 24999900,
            'product_image' => 'ASUS_4.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS ROG',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 18999900,
            'product_image' => 'ASUS_5.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS Vivobook Pro',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 15988000,
            'product_image' => 'ASUS_6.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'Asus Vivobook',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 9899000,
            'product_image' => 'ASUS_7.png',
        ])->category()->attach(1);

        Product::create([
            'product_name' => 'ASUS Tuf',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 15899000,
            'product_image' => 'ASUS_8.png',
        ])->category()->attach(1);

    	// ACER
    	Product::create([
    		'product_name' => 'ACER Predator',
    		'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
    		'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
    		'product_price' => 20899000,
    		'product_image' => 'ACER_1.png'
    	])->category()->attach(2);

    	// HP
        Product::create([
            'product_name' => 'HP Spectre X360',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => 14599000,
            'product_image' => 'HP_1.png'
        ])->category()->attach(3);

        Product::create([
            'product_name' => 'HP Omen',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => '18999000',
            'product_image' => 'HP_2.png'
        ])->category()->attach(3);

        Product::create([
            'product_name' => 'HP Pavillion',
            'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
            'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
            'product_price' => '14899000',
            'product_image' => 'HP_3.png'
        ])->category()->attach(3);

    	// APPLE
    	Product::create([
			'product_name' => 'Macbook Air 2020',
			'product_description' => 'A lightweight laptop for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
			'product_price' => 18998000,
			'product_image' => 'MAC_1.png'
    	])->category()->attach(4);

    	Product::create([
			'product_name' => 'Mac Mini 2020',
			'product_description' => 'A lightweight processor for gamer and daily use with high performance and 100% sRGB to boost up your gaming experience.',
			'product_spec' => '<ul><li>Intel Core i7-9500U</li><li>16GB RAM</li><li>512GB SSD PCle</li><li>NVIDIA Gefoce 1080 Ti</li><li>100% sRGB</li><li>90% Screen Ratio</li><li>8000 MAh Battery</li></ul>',
			'product_price' => 25499000,
			'product_image' => 'MACMINI_1.png'
    	])->category()->attach(4);

        // RAZER
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
