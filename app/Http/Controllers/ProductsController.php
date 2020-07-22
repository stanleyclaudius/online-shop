<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductsController extends Controller
{
    public function index()
    {
    	return view('products/index');
    }

    public function detail($id)
    {
    	$product = Product::find($id);
    	return view('products/detail', compact(['product']));
    }
}
