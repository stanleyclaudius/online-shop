<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
use App\User;

class DashboardController extends Controller
{
    public function index()
    {
    	$menus = Menu::all();
    	$user = User::find(auth()->user()->id);
    	return view('dashboard/index', compact(['menus', 'user']));
    }
}
