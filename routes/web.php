<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@index');

Route::get('/login', 'AuthController@login');
Route::post('/login', 'AuthController@postLogin');
Route::get('/register', 'AuthController@register');
Route::post('/register', 'AuthController@postRegister');

Route::get('/products', 'ProductsController@index');
Route::get('/detail/{id}', 'ProductsController@detail');

Route::group(['middleware' => 'auth'], function() {
	Route::get('/logout', 'AuthController@logout');
});