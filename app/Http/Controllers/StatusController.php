<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Checkout;
use App\Cart;
use PDF;

class StatusController extends Controller
{
    public function index()
    {
    	$data = Checkout::where('user_id', auth()->user()->id)->where('is_done', 0)->get();
    	return view('status/index', ['data' => $data]);
    }

    public function printInvoice($id)
    {
    	$data = Checkout::find($id);
        $cart = Cart::where('checkout_id', $id)->get();
        if (!$data) {
            return redirect()->back()->with('status', 'invoice unavailable');
        } else {
            $pdf = PDF::loadView('pdf/invoice', ['data' => $data, 'cart' => $cart]);
            return $pdf->download($data->shipping->name . ' Invoice.pdf');
        }
    }
}
