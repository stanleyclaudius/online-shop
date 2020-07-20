<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{
    public function login()
    {
    	return view('auth/login');
    }

    public function postLogin(Request $request)
    {

    }

    public function register()
    {
    	return view('auth/register');
    }

    public function postRegister(Request $request)
    {

    }

    public function logout()
    {
    	Auth::logout();
    	return redirect('/login')->with('auth', 'logout');
    }
}
