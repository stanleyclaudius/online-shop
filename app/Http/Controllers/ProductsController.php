<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Category;
use App\Product;
use App\Review;

class ProductsController extends Controller
{
    public function index()
    {
        if (request()->category) {
            $products = Product::with('category')->whereHas('category', function ($query) {
                $query->where('slug', request()->category);
            });
            $categories = optional(Category::orderBy('category', 'ASC'))->get();
        } else {
            $categories = Category::orderBy('category', 'ASC')->get();
            $products = Product::take(12);
        }

        if(request()->sort == 'low_high') {
            $products = $products->orderBy('product_price')->paginate(8);
        } else if (request()->sort == 'high_low') {
            $products = $products->orderBy('product_price', 'desc')->paginate(8);
        } else {
            $products = $products->paginate(8);
        }
    	return view('products/index', compact(['products', 'categories']));
    }
    
    public function detail($id)
    {
    	$product = Product::find($id);
        $reviews = Review::where('product_id', $id)->where('is_review', 1)->orderBy('id', 'DESC')->get();
    	return view('products/detail', compact(['product', 'reviews']));
    }
}
