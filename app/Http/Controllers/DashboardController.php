<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Newsletter;
use App\Checkout;
use App\Discount;
use App\Product;
use App\Review;
use App\Menu;
use App\User;

class DashboardController extends Controller
{		
    public function index()
    {
		$menus = Menu::all();
    	$user = User::find(auth()->user()->id);
    	$discount = Discount::count();
    	$product = Product::count();
    	$sold = Checkout::where('status', 1)->count();
    	$reviewCount = Review::where('is_review', 1)->count();
    	$review = Review::where('is_review', 1)->sum('star');

    	if (($reviewCount > 0) && ($review > 0)) {
    		$review = $review/$reviewCount;
    	} else {
    		$review = 0;
    	}

		$complete = Checkout::where('status', 1)->where('is_done', 1)->count();
		$unverified = Checkout::where('status', 0)->count();
		$arriving = Checkout::where('status', 1)->where('is_done', 0)->count();
		$earningTotal = Checkout::where('status', 1)->sum('total');
		$earningDiscount = Checkout::where('status', 1)->sum('discount');
		$postEarning = $earningTotal - $earningDiscount;

    	return view('dashboard/index', [
    		'discount' => $discount,
    		'user' => $user,
    		'menus' => $menus,
    		'product' => $product,
    		'sold' => $sold,
    		'review' => $review,
    		'complete' => $complete,
    		'unverified' => $unverified,
    		'arriving' => $arriving,
    		'postEarning' => $postEarning,
    	]);
    }

    public function sendNewsletter(Request $request)
    {
    	$this->validate($request, [
    		'newsletter' => 'required'
    	]);

    	$newsletter = Newsletter::create([
    		'content' => $request->newsletter
    	]);

    	$subscribeUser = User::where('is_subscribe', 1)->get();
		$getNews = Newsletter::where('id', $newsletter->id)->get()->first();
		$data = [
			'getNews' => $getNews->content,
			'postDate' => $getNews->created_at,
		];

    	foreach ($subscribeUser as $sub) {
    		$to_email = $sub->email;
    		$to_name = $sub->name;

	    	Mail::send('email/newsletter', ['data' => $data], function($m) use ($to_email, $to_name) {
	            $m->subject('DS Newsletter');
	            $m->from('duniakodingacademy@gmail.com', 'Dunia Koding');
	            $m->to($to_email, $to_name);
	        });
    	}

    	return redirect('/dashboard')->with('admin', 'sendnewsletter');
    }
}
