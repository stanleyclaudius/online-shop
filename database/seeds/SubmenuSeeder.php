<?php

use Illuminate\Database\Seeder;
use App\Submenu;

class SubmenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$menuID = [1, 2, 3, 3, 4, 5, 4];
    	$submenu = ['Dashboard', 'Signature Products', 'Product List', 'Product Category', 'User Order', 'Discount', 'Done Order'];
    	$icon = ['dashboard.png', 'signature.png', 'product.png', 'category.png', 'order.png', 'discount.png', 'done.png'];
    	$link = ['/dashboard', '/signature', '/product', '/product/category', '/order', '/discount', '/order/done'];
    	for ($i = 0; $i < 7; $i++) {
	        Submenu::create([
	        	'menu_id' => $menuID[$i],
	        	'submenu' => $submenu[$i],
	        	'icon' => $icon[$i],
	        	'link' => $link[$i],
	        ]);
        }
    }
}
