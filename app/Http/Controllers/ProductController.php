<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;

class ProductController extends Controller
{
    public function index()
    {
    	$menus = Menu::all();
    	return view('product/index', compact(['menus']));
    }
}
