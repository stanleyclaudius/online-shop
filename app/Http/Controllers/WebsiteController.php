<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Signature;
use App\Product;
use App\Menu;
use App\User;

class WebsiteController extends Controller
{
    public function signature()
    {
    	$menus = Menu::all();
    	$signatures = Signature::all();
    	$products = Product::all();
    	$user = User::find(auth()->user()->id);
    	return view('signature/index', compact(['signatures', 'products', 'menus', 'user']));
    }

    public function addSignature(Request $request)
    {
    	$this->validate($request, [
			'product_id' => 'required|unique:signatures',
    	]);

    	Signature::create([
    		'product_id' => $request->product_id,
    	]);

    	return redirect()->back()->with('admin', 'signature added');
    }

    public function deleteSignature($id)
    {
        $signature = Signature::find($id);
        $signature->delete();
        return redirect()->back()->with('admin', 'signature deleted');
    }
}
