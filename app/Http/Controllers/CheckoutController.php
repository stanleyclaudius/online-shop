<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Checkout;
use App\Shipping;
use App\Discount;
use App\Cart;

class CheckoutController extends Controller
{
    public function index()
    {
    	$userID = auth()->user()->id;
    	$result = Cart::where('user_id', $userID)->where('show_cart', 1)->get();
    	if ($result->count() == 0) {
    		return redirect('/cart');
    	}
    	$items = Cart::where('user_id', $userID)->where('show_cart', 1)->get();
    	$totalPrice = Cart::where('user_id', $userID)->where('show_cart', 1)->sum('total');
    	return view('checkout/index', compact(['items', 'totalPrice']));
    }

    public function discount(Request $request)
    {
        $code = $request->code;
        $results = Discount::where('code', $code)->get()->first();
        if ($results) {
            $data = [
                'status' => 'applied',
                'value' => $results->value,
            ];
            echo json_encode($data);
        } else {
            $data = [
                'status' => 'error',
            ];
            echo json_encode($data);
        }
    }

    public function proceedCheckout(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required',
            'country' => 'required',
            'province' => 'required',
            'city' => 'required',
            'address' => 'required',
        ]);

        $initialPrice = $request->initialtotalprice;
        $finalPrice = $request->finalResultHidden;
        if ($finalPrice == null) {
            $finalPrice = $initialPrice;
        }

        $userItems = DB::table('carts')->where('user_id', auth()->user()->id)->where('show_cart', 1)->get();
        $productID = '';

        foreach ($userItems as $userItem => $key) {
            if ($userItem !== count($userItems) - 1) {
                $productID .= $key->product_id . ' ';
            } else {
                $productID .= $key->product_id;
            }
        }

        $checkout = new Checkout;
        $checkout->order_code = 'DS - ' . strtoupper(Str::random(5));
        $checkout->user_id = auth()->user()->id;
        $checkout->product_id = $productID;
        $checkout->total = $initialPrice;
        $checkout->discount = $initialPrice - $finalPrice;
        $checkout->status = 0;
        $checkout->is_done = 0;
        $checkout->save();

        $updateCheckout = DB::table('carts')->where('user_id', auth()->user()->id)->where('show_cart', 1)->update(['checkout_id' => $checkout->id]);

       $shipping = Shipping::create([
            'user_id' => auth()->user()->id,
            'checkout_id' => $checkout->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'country' => $request->country,
            'province' => $request->province,
            'city' => $request->city,
            'address' => $request->address,
            'is_done' => 0,
        ]);

       $checkout->shipping_id = $shipping->id;
       $checkout->save();

        $cart = DB::table('carts')->where('user_id', auth()->user()->id)->update(['show_cart' => 0]);

        $data = [
            'name' => $shipping->name,
            'order_code' => $checkout->order_code,
            'total' => $checkout->total,
            'discount' => $checkout->discount,
            'phone' => $shipping->phone,
            'country' => $shipping->country,
            'province' => $shipping->province,
            'city' => $shipping->city,
            'address' => $shipping->address,
        ];

        $to_email = auth()->user()->email;
        $to_name = auth()->user()->name;

        Mail::send('email/checkout', ['data' => $data], function($m) use ($to_email, $to_name) {
            $m->subject('Payment Confirmation');
            $m->from('duniakodingacademy@gmail.com', 'Dunia Koding');
            $m->to($to_email, $to_name);
        });

        return redirect('/status')->with('status', 'status added');
    }
}
	