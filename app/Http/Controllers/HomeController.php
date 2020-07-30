<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Product;
use App\Signature;
use Auth;

class HomeController extends Controller
{
    public function index()
    {
    	$products = DB::table('products')->orderBy('id', 'DESC')->take(5)->get();
    	$signatures = Signature::all();
    	return view('home/index', compact(['signatures', 'products']));
    }

    public function addSubscription(Request $request)
    {
    	$this->validate($request, [
    		'email' => 'required|email',
    	]);

    	if (Auth::check()) {
    		$user = User::find(auth()->user()->id);
    		$user->update(['is_subscribe' => 1]);
    		return redirect('/')->with('subscribe', 'issubscribe');
    	}
    	return redirect('/login');
    }
}
