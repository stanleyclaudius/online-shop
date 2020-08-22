<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Signature;
use App\Jumbotron;
use App\Product;
use App\User;
use Auth;

class HomeController extends Controller
{
    public function index()
    {
    	$products = DB::table('products')->orderBy('id', 'DESC')->take(5)->get();
    	$signatures = Signature::all();
        $jumbotron = Jumbotron::all();
    	return view('home/index', compact(['signatures', 'products', 'jumbotron']));
    }

    public function addSubscription(Request $request)
    {
    	$this->validate($request, [
    		'email' => 'required|email',
    	]);

    	if (Session::get('log') == 'true') {
    		$user = User::find(auth()->user()->id);
            if ($user->email == $request->email) {
        		$user->update(['is_subscribe' => 1]);
        		return redirect('/')->with('subscribe', 'issubscribe');
            } else {
                return redirect('/')->with('subscribe', 'no email');
            }
    	}
    	return redirect('/login');
    }
}
