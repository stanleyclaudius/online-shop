<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;

class DashboardController extends Controller
{
    public function index()
    {
    	$menus = Menu::all();
    	return view('dashboard/index', compact(['menus']));
    }
}
