<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cart;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
    	$items = Cart::where('user_id', auth()->user()->id)->get();
    	return view('cart/index', compact(['items']));
    }

    public function addItem(Request $request)
    {
    	$userID = $request->userID;
    	$productID = $request->productID;

    	if (DB::table('carts')->where('user_id', $userID)->count() < 1) {
    		Cart::create([
	    		'user_id' => $userID,
	    		'product_id' => $productID,
	    		'qty' => 1,
	    	]);
	    	echo json_encode('zero val');
    	} else {
    		if (DB::table('carts')->where('user_id', $userID)->where('product_id', $productID)->count() == 1) {
    			$data = Cart::where('user_id', $userID)->where('product_id', $productID)->get()->first();
    			$data->update([
                    'qty' => $data->qty + 1,
                ]);
                $data->update([
                    'total' => $data->qty * $data->product->product_price,
                ]);
                echo json_encode('add existing product');
    		} else {
	    		Cart::create([
		    		'user_id' => $userID,
		    		'product_id' => $productID,
		    		'qty' => 1,
		    	]);
		    	echo json_encode('add counter');
    		}
    	}
    }

    public function deleteItem($id)
    {
    	$cart = Cart::find($id);
    	$cart->delete();
    	return redirect()->back()->with('cart', 'item deleted');
    }

    public function updateItem(Request $request, $id)
    {
    	$qty = $request->qty;
    	$item = Cart::find($id);
    	$item->update([
    		'qty' => $qty,
    	]);
    	$item->update([
    		'total' => $item->qty * $item->product->product_price,
    	]);
    	$total_price = $item->qty * $item->product->product_price;
    	$number_format = 'Rp.' . number_format($total_price, 2, ',', '.');
    	echo json_encode($number_format);
    }
}
