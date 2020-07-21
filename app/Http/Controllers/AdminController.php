<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hash;

class AdminController extends Controller
{
    public function editProfile(Request $request, $id)
    {
    	$this->validate($request, [
    		'name' => 'required',
    		'avatar' => 'mimes:jpg,png,jpeg',
    	]);

    	$user = User::find($id);
    	$user->update([
    		'name' => $request->name,
    	]);

    	if ($request->hasFile('avatar')) {
    		$request->file('avatar')->move('img/avatar/', $request->file('avatar')->getClientOriginalName());
    		$user->avatar = $request->file('avatar')->getClientOriginalName();
    		$user->save();
    	} else {
    		$user->avatar = $user->avatar;
    	}

    	return redirect()->back()->with('admin', 'profile changed');
    }

    public function changePassword(Request $request, $id)
    {
    	$this->validate($request, [
    		'old_password' => 'required',
    		'password' => 'required|min:6|confirmed',
    		'password_confirmation' => 'required|min:6',
    	]);

    	$user = User::find($id);
    	if (Hash::check($request->old_password, $user->password)) {
    		$user->password = bcrypt($request->password);
    		$user->save();
    		return redirect()->back()->with('admin', 'password changed');
    	} else {
    		return redirect()->back()->with('admin', 'wrong cur pass');
    	}
    }
}
