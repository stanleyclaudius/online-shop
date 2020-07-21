<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@index');

Route::get('/login', 'AuthController@login')->name('login');
Route::post('/login', 'AuthController@postLogin');
Route::get('/register', 'AuthController@register');
Route::post('/register', 'AuthController@postRegister');
Route::get('/verify/{id}', 'AuthController@verify');
Route::post('/verify/{email}', 'AuthController@postVerify');
Route::get('/verify/resend/{email}', 'AuthController@resendVerify');
Route::get('/forgetpass', 'AuthController@forgetPassword');
Route::post('/forgetpass', 'AuthController@postForgetPassword');
Route::get('/reset/{token}', 'AuthController@resetPassword');
Route::post('/reset/password/{email}/{token}', 'AuthController@postResetPassword');

Route::get('/products', 'ProductsController@index');
Route::get('/detail/{id}', 'ProductsController@detail');

Route::group(['middleware' => 'auth', 'checkRole:1,2'], function() {
	Route::get('/logout', 'AuthController@logout');
});

Route::group(['middleware' => 'auth', 'checkRole:1'], function() {
	
});