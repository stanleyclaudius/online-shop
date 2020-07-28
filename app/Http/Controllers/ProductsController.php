<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Category;
use App\Product;

class ProductsController extends Controller
{
    public function index()
    {
    	$categories = Category::orderBy('category', 'ASC')->get();
    	$products = Product::orderBy('id', 'DESC')->paginate(8);
    	return view('products/index', compact(['products', 'categories']));
    }
    
    public function detail($id)
    {
    	$product = Product::find($id);
    	return view('products/detail', compact(['product']));
    }
}
