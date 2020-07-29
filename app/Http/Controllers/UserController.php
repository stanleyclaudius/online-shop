<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User;
use Auth;
use Hash;

class UserController extends Controller
{
    public function personal()
    {
    	$user = User::find(auth()->user()->id);
    	return view('user/index', compact(['user']));
    }

    public function updatePersonal(Request $request)
    {
    	$this->validate($request, [
    		'avatar' => 'mimes:jpg,png,jpeg',
    	]);

    	$user = User::find(auth()->user()->id);
    	$user->update([
    		'name' => $request->name,
    		'phone' => $request->phone,
    		'gender' => $request->gender,
    	]);
    	if ($request->hasFile('avatar')) {
    		$request->file('avatar')->move('img/avatar/', $request->file('avatar')->getClientOriginalName());
    		$user->avatar = $request->file('avatar')->getClientOriginalName();
    		$user->save();
    	} else {
    		$user->avatar = $user->avatar;
    	}

    	return redirect()->back()->with('user', 'profile changed');
    }

    public function address()
    {
    	$user = User::find(auth()->user()->id);
    	return view('user/address', compact(['user']));
    }

    public function updateAddress(Request $request)
    {
    	$user = User::find(auth()->user()->id);
    	$user->update([
    		'country' => $request->country,
    		'province' => $request->province,
    		'city' => $request->city,
    		'address' => $request->address,
    	]);
    	return redirect()->back()->with('user', 'address changed');
    }

    public function delete()
    {
    	$user = User::find(auth()->user()->id);
    	return view('user/delete', compact(['user']));
    }

    public function deleteAccount(Request $request)
    {
    	$this->validate($request, [
    		'deletemessage' => 'required',
    	]);

    	$user = User::find(auth()->user()->id);

    	if ($request->deletemessage === "REMOVE MY ACCOUNT") {
            DB::table('shippings')->where('user_id', auth()->user()->id)->delete();
            DB::table('reviews')->where('user_id', auth()->user()->id)->delete();
            DB::table('public_messages')->where('user_id', auth()->user()->id)->delete();
            DB::table('messages')->where('user_id', auth()->user()->id)->delete();
            DB::table('checkouts')->where('user_id', auth()->user()->id)->delete();
            DB::table('carts')->where('user_id', auth()->user()->id)->delete();
    		Session::pull('log', 'true');
    		Auth::logout();
    		$user->delete();
    		return redirect('/register')->with('user', 'account deleted');
    	} else {
    		return redirect('/user/delete')->with('user', 'wrong verification');
    	}
    }

    public function password()
    {
        return view('user/password');
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'old_password' => 'required',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
        ]);

        $user = User::find(auth()->user()->id);
        if (Hash::check($request->old_password, $user->password)) {
            $user->password = bcrypt($request->password);
            $user->save();
            return redirect('/user/password')->with('user', 'password changed');
        } else {
            return redirect('/user/password')->with('user', 'wrong cur pass');
        }
    }
}
