<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Newsletter;
use App\Jumbotron;
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
    	$checkoutSold = Checkout::where('status', 1)->get();
        $checkoutProd = 0;
        foreach ($checkoutSold as $check) {
            $product_id = explode(' ', $check->product_id);
            $checkoutProd = $checkoutProd + count($product_id);
        }
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
        $newsletters = Newsletter::all();
        $jumbotron = Jumbotron::all();

    	return view('dashboard/index', [
    		'discount' => $discount,
    		'user' => $user,
    		'menus' => $menus,
    		'product' => $product,
    		'sold' => $checkoutProd,
    		'review' => $review,
    		'complete' => $complete,
    		'unverified' => $unverified,
    		'arriving' => $arriving,
    		'postEarning' => $postEarning,
            'newsletters' => $newsletters,
            'jumbotron' => $jumbotron
    	]);
    }

    public function sendNewsletter(Request $request)
    {
    	$this->validate($request, [
            'topic' => 'required',
    		'newsletter' => 'required'
    	]);

        $users = User::where('is_subscribe', 1)->count();
        if ($users > 0) {
        	$newsletter = Newsletter::create([
                'topic' => $request->topic,
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
    	            $m->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    	            $m->to($to_email, $to_name);
    	        });
        	}

        	return redirect('/dashboard')->with('admin', 'sendnewsletter');
        } else {
            return redirect('/dashboard')->with('admin', 'no user subscribe');
        }
    }

    public function deleteNewsletter($id)
    {
        $newsletter = Newsletter::find($id);
        $newsletter->delete();
        return redirect()->back()->with('admin', 'newsletter deleted');
    }

    public function updateJumbotron($id)
    {
        $menus = Menu::all();
        $user = User::find(auth()->user()->id);
        $jumbotron = Jumbotron::find($id);
        return view('dashboard/jumbotron', compact(['jumbotron', 'menus', 'user']));
    }

    public function postUpdateJumbotron(Request $request, $id) 
    {
        $this->validate($request, [
            'jumbotron' => 'mimes:jpg,png,jpeg',
        ]);

        $jumbotron = Jumbotron::find($id);
        if ($request->hasFile('jumbotron')) {
            $request->file('jumbotron')->move('img/contents/', $request->file('jumbotron')->getClientOriginalName());
            $jumbotron->jumbotron = $request->file('jumbotron')->getClientOriginalName();
            $jumbotron->save();
        } else {
            $jumbotron->jumbotron = $jumbotron->jumbotron;
        }
        return redirect('/dashboard')->with('admin', 'jumbotron updated');
    }
}
