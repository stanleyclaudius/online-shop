<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\PublicMessage;
use App\Message;
use App\Discount;
use App\Menu;
use App\User;

class DiscountController extends Controller
{
    public function index()
    {
    	$menus = Menu::all();
    	$user = User::find(auth()->user()->id);
    	$discounts = Discount::all();
    	return view('discount/index', compact(['menus', 'user', 'discounts']));
    }

    public function addDiscount(Request $request)
    {
    	$this->validate($request, [
    		'code' => 'required|unique:discounts',
    		'value' => 'required',
    	]);

    	$discount = Discount::create([
    		'code' => $request->code,
    		'value' => $request->value,
    	]);

        $users = User::where('role_id', '!=', 1)->get();
        foreach ($users as $user) {
            PublicMessage::create([
                'user_id' => $user->id,
                'discount_id' => $discount->id,
                'icon' => 'discount.png',
                'main_tagline' => 'Grab your discount now!',
                'sub_tagline' => 'Get ' . $discount->value . '% discount using ' . $discount->code . ' code.',
                'link_page' => '/products',
                'is_read' => 0,
            ]);
        }

    	return redirect()->back()->with('admin', 'discount added');
    }

    public function deleteDiscount($id)
    {
        DB::table('public_messages')->where('discount_id', $id)->delete();
    	$discount = Discount::find($id);
    	$discount->delete();
    	return redirect()->back()->with('admin', 'discount deleted');
    }
}
