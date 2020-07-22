<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;
use App\Signature;

class HomeController extends Controller
{
    public function index()
    {
    	$products = DB::table('products')->orderBy('id', 'DESC')->take(5)->get();
    	$signatures = Signature::all();
    	return view('home/index', compact(['signatures', 'products']));
    }
}
