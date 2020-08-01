<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\PublicMessage;
use App\Discount;
use App\User;
use App\Token;
use Auth;

class AuthController extends Controller
{
    public function login()
    {
        if (Session::get('log') == 'true') {
            return redirect('/');
        }
    	return view('auth/login');
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->get()->first();
            $token = Token::where('email', $request->email)->get()->first();
            if ($user->is_verified == 0) {
                return redirect('/verify/' . $token->id);
            } else {
                if ($user->role_id == 1) {
                    return redirect('/dashboard');
                } else {
                    Session::put('log', 'true');
                    return redirect('/');
                }
            }
        }

        return redirect('/login')->with('auth', 'wrong user');
    }

    public function register()
    {
        if (Session::get('log') == 'true') {
            return redirect('/');
        }
    	return view('auth/register');
    }

    public function postRegister(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
        ]);

        $discount = Discount::all();

        $user = User::create([
            'role_id' => 2,
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'remember_token' => Str::random(10),
            'avatar' => 'default.png',
            'is_verified' => 0,
            'is_subscribe' => 0,
        ]);

        if ($discount != null) {
            foreach ($discount as $d) {
                PublicMessage::create([
                    'user_id' => $user->id,
                    'discount_id' => $d->id,
                    'icon' => 'discount.png',
                    'main_tagline' => 'Grab your discount now!',
                    'sub_tagline' => 'Get ' . $d->value .'% discount using ' . $d->code . ' code.',
                    'link_page' => '/products',
                    'is_read' => 0,
                ]);
            }
        }

        $token = new Token;
        $token->email = $request->email;
        $token->token = strtoupper(Str::random(5));
        $token->save();

        $data = [
            'name' => $request->name,
            'token' => $token->token,
        ];

        $to_email = $request->email;
        $to_name = $request->name;

        Mail::send('email/confirmation', ['data' => $data], function($m) use ($to_email, $to_name) {
            $m->subject('Verification Code');
            $m->from('duniakodingacademy@gmail.com', 'Dunia Koding');
            $m->to($to_email, $to_name);
        });

        return redirect('/verify/' . $token->id);
    }

    public function verify($id)
    {
        $token = Token::find($id);
        if (is_null($token)) {
            return redirect('/register');
        }
        $email = $token->email;
        return view('auth/verify', ['email' => $email]);
    }

    public function postVerify(Request $request, $email)
    {
        $input1 = $request->input1;
        $input2 = $request->input2;
        $input3 = $request->input3;
        $input4 = $request->input4;
        $input5 = $request->input5;

        $code = $input1 . $input2 . $input3 . $input4 . $input5;
        $code = strtoupper($code);

        $check = Token::where('email', $email)->where('token', $code)->get()->first();
        if ($check) {
            DB::table('tokens')->where('email', $email)->delete();
            DB::table('users')->where('email', $email)->update([
                'is_verified' => 1,
            ]);
            return redirect('/login')->with('auth', 'true verify code');
        } else {
            return redirect()->back()->with('auth', 'false verify code');
        }
    }

    public function resendVerify($email) 
    {
        $user = User::where('email', $email)->get()->first();

        DB::table('tokens')->where('email', $email)->delete();

        $token = new Token;
        $token->email = $email;
        $token->token = strtoupper(Str::random(5));
        $token->save();

        $data = [
            'name' => $user->name,
            'token' => $token->token,
        ];

        $to_email = $email;
        $to_name = $user->name;

        Mail::send('email/confirmation', ['data' => $data], function($m) use ($to_email, $to_name) {
            $m->subject('Verification Code');
            $m->from('duniakodingacademy@gmail.com', 'Dunia Koding');
            $m->to($to_email, $to_name);
        });

        return redirect('/verify/' . $token->id);
    }

    public function forgetPassword()
    {
        if (Auth::check()) {
            return redirect('/');
        }

        return view('auth/forget');
    }

    public function postForgetPassword(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);
        $user = User::where('email', $request->email)->get()->first();

        if (!$user) {
            return redirect()->back()->with('auth', 'no email');
        }

        $to_email = $user->email;
        $to_name = $user->name;

        $token = new Token;
        $token->email = $to_email;
        $token->token = Str::random(30);
        $token->save();

        $data = [
            'name' => $user->name,
            'token' => $token->token,
        ];  

        if ($user) {
            Mail::send('email/forget', ['data' => $data], function($m) use ($to_email, $to_name) {
                $m->subject('Password Reset');
                $m->from('duniakodingacademy@gmail.com', 'Dunia Koding');
                $m->to($to_email, $to_name);
            });
            return redirect()->back()->with('auth', 'link send');
        }
    }

    public function resetPassword($token)
    {
        $token = Token::where('token', $token)->get()->first();
        if (!$token) {
            return redirect('/forgetpass')->with('auth', 'no token');
        } else {
            if (strlen($token->token) != 30) {
                return redirect('/forgetpass')->with('auth', 'no token');
            } else {
                return view('auth/reset', ['token' => $token->token, 'email' => $token->email]);
            }
        }
    }

    public function postResetPassword(Request $request, $email, $token)
    {
        $this->validate($request, [
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
        ]);

        DB::table('users')->where('email', $email)->update([
            'password' => bcrypt($request->password),
        ]);

        DB::table('tokens')->where('token', $token)->delete();

        return redirect('/login')->with('auth', 'password changed');
    }

    public function logout()
    {
        Session::pull('log', 'true');
    	Auth::logout();
    	return redirect('/login')->with('auth', 'logout');
    }
}
