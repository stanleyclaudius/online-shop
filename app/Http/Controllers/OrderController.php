<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shipping;
use App\Checkout;
use App\Product;
use App\Message;
use App\Review;
use App\Cart;
use App\User;
use App\Menu;
use PDF;

class OrderController extends Controller
{
    public function index()
    {
    	$menus = Menu::all();
    	$user = User::find(auth()->user()->id);
    	$checkouts = Checkout::where('is_done', 0)->orderBy('id', 'DESC')->get();
    	return view('order/index', compact(['menus', 'user', 'checkouts']));
    }

    public function verified($id)
    {
    	$checkout = Checkout::find($id);
    	$checkout->update([
    		'status' => 1,
    	]);
    	return redirect()->back()->with('admin', 'order verified');
    }

    public function invoice($id)
    {
        $data = Checkout::find($id);
        $cart = Cart::where('checkout_id', $id)->get();
        if (!$data) {
            return redirect()->back()->with('admin', 'invoice unavailable');
        } else {
            $pdf = PDF::loadView('pdf/invoice', ['data' => $data, 'cart' => $cart]);
            return $pdf->download($data->shipping->name . ' Invoice.pdf');
        }
    }

    public function deleteOrder($id)
    {
        $cart = Cart::where('checkout_id', $id);
        $cart->delete();
        $shipping = Shipping::where('checkout_id', $id);
        $shipping->delete();
        $checkout = Checkout::find($id);
        $checkout->delete();
        return redirect()->back()->with('admin', 'order deleted');
    }

    public function finishOrder($id)
    {   
        $checkout = Checkout::find($id);
        if ($checkout->receipt == null) {
            return redirect()->back()->with('admin', 'receipt null');
        } else {
            if ($checkout->is_done == 1) {
                return redirect()->back()->with('admin', 'done before');
            } else {
                $checkout->update([
                    'is_done' => 1,
                ]);
                $shipping = Shipping::where('checkout_id', $id)->update(['is_done' => 1]);
                $items = preg_split('/\s+/', $checkout->product_id);
                $itemsCount = count($items);
                for($i = 0; $i < $itemsCount; $i++) {
                    $product = Product::where('id', $items[$i])->get()->first();
                    Review::create([
                        'user_id' => $checkout->user_id,
                        'product_id' => $items[$i],
                        'is_review' => 0,
                    ]);

                    Message::create([
                        'user_id' => $checkout->user_id,
                        'icon' => 'rate.png',
                        'main_tagline' => 'Review Products',
                        'sub_tagline' => 'You have 1 chance to review ' . $product->product_name . '.',
                        'link_page' => '/detail/' . $product->id,
                        'is_read' => 0,
                    ]);
                }
                return redirect()->back()->with('admin', 'order done');
            }
        }
    }

    public function postReceipt($id)
    {
        $menus = Menu::all();
        $user = User::find(auth()->user()->id);
        $checkout = Checkout::find($id);
        return view('order/receipt', compact(['checkout', 'menus', 'user']));
    }

    public function updateReceipt(Request $request, $id)
    {
        $this->validate($request, [
            'receipt' => 'required',
        ]);

        $checkout = Checkout::find($id);
        if ($checkout->status == 0) {
            return redirect('/order')->with('admin', 'payment unverified');
        } else {
            $checkout->update([
                'receipt' => $request->receipt,
            ]);
            return redirect('/order')->with('admin', 'receipt posted');
        }
    }

    public function doneOrder()
    {
        $menus = Menu::all();
        $user = User::find(auth()->user()->id);
        $checkouts = Checkout::where('is_done', 1)->orderBy('id', 'DESC')->get();
        return view('order/done', compact(['checkouts','menus', 'user']));
    }
}
