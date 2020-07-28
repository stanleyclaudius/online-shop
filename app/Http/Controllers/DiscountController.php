<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    	Discount::create([
    		'code' => $request->code,
    		'value' => $request->value,
    	]);

    	return redirect()->back()->with('admin', 'discount added');
    }

    public function deleteDiscount($id)
    {
    	$discount = Discount::find($id);
    	$discount->delete();
    	return redirect()->back()->with('admin', 'discount deleted');
    }
}
