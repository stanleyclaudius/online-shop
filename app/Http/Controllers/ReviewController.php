<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Review;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
 		$review = Review::where('user_id', auth()->user()->id)->where('product_id', $request->productID)->update([
 			'is_review' => 1,
 			'name' => $request->name,
 			'email' => $request->email,
 			'review' => $request->review,
 			'star' => $request->starrating,
 		]);
 		return redirect('/detail/' . $request->productID)->with('detail', 'review added');
    }
}