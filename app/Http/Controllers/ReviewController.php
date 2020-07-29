<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Review;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'review' => 'required'
        ]);

 		$review = Review::where('user_id', auth()->user()->id)->where('product_id', $request->productID)->update([
 			'is_review' => 1,
 			'name' => $request->name,
 			'email' => $request->email,
 			'review' => $request->review,
 			'star' => $request->starrating,
 		]);
 		return redirect('/detail/' . $request->productID)->with('detail', 'review added');
    }

    public function starView(Request $request)
    {
    	$reviews = Review::where('product_id', $request->productID)->where('star', $request->starRating)->where('is_review', 1)->orderBy('id', 'DESC')->get();
    	return view('review/review', compact(['reviews']));
    }

    public function getAll(Request $request)
    {
    	$reviews = Review::where('product_id', $request->productID)->where('is_review', 1)->orderBy('id', 'DESC')->get();
    	return view('review/all', compact(['reviews']));
    }
}