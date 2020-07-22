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

Route::group(['middleware' => ['auth', 'checkRole:1,2']], function() {
	Route::get('/logout', 'AuthController@logout');
});

Route::group(['middleware' => ['auth', 'checkRole:1']], function() {
	Route::post('/admin/editprofile/{id}', 'AdminController@editProfile');
	Route::post('/admin/changepassword/{id}', 'AdminController@changePassword');
	
	Route::get('/dashboard', 'DashboardController@index');

	Route::get('/signature', 'WebsiteController@signature');
	Route::post('/signature', 'WebsiteController@addSignature');
	Route::get('/signature/delete/{id}', 'WebsiteController@deleteSignature');

	Route::get('/product', 'ProductController@index');
	Route::post('/product/add', 'ProductController@addProduct');
	Route::get('/product/delete/{id}', 'ProductController@deleteProduct');
	Route::get('/product/update/{id}', 'ProductController@updateProduct');
	Route::post('/product/update/{id}', 'ProductController@postUpdateProduct');
	Route::get('/product/category', 'ProductController@category');
	Route::post('/product/category', 'ProductController@addCategory');
	Route::get('/product/category/delete/{id}', 'ProductController@deleteCategory');
	Route::get('/product/category/update/{id}', 'ProductController@updateCategory');
	Route::post('/product/category/update/{id}', 'ProductController@postUpdateCategory');
});