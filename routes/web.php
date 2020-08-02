<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@index');

Route::post('/subscribe', 'HomeController@addSubscription');

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

Route::get('/products', [
	'as' => 'products.category',
	'uses' => 'ProductsController@index'
]);

Route::post('/review', 'ReviewController@index');
Route::get('/review/get', 'ReviewController@starView');
Route::get('/review/get/all', 'ReviewController@getAll');

Route::group(['middleware' => ['auth', 'checkRole:1,2']], function() {
	Route::get('/logout', 'AuthController@logout');
});

Route::group(['middleware' => ['auth', 'checkRole:2']], function() {
	Route::get('/cart', 'CartController@index');
	Route::post('/cart/add', 'CartController@addItem');
	Route::get('/cart/delete/{id}', 'CartController@deleteItem');
	Route::post('/cart/update/{id}', 'CartController@updateItem');

	Route::get('/checkout', 'CheckoutController@index');
	Route::get('/checkout/discount', 'CheckoutController@discount');
	Route::post('/checkout', 'CheckoutController@proceedCheckout');

	Route::get('/status', 'StatusController@index');
	Route::get('/status/invoice/{id}', 'StatusController@printInvoice');
	Route::get('/status/done', 'StatusController@doneStatus');

	Route::get('/user', 'UserController@personal');
	Route::post('/user', 'UserController@updatePersonal');
	Route::get('/user/address', 'UserController@address');
	Route::post('/user/address', 'UserController@updateAddress');
	Route::get('/user/delete', 'UserController@delete');
	Route::post('/user/delete', 'UserController@deleteAccount');
	Route::get('/user/password', 'UserController@password');
	Route::post('/user/password', 'UserController@changePassword');
	Route::get('/user/subscription', 'UserController@subscription');
	Route::post('/user/subscription', 'UserController@unsubscribe');

	Route::get('/message', 'MessageController@index');
	Route::get('/message/delete/{id}', 'MessageController@deleteMessage');
	Route::get('/message/public/delete/{id}', 'MessageController@deletePublicMessage');
	Route::post('/message/update/', 'MessageController@updateMessage');
	Route::post('/message/public/update', 'MessageController@updatePublicMessage');
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

	Route::get('/order', 'OrderController@index');
	Route::get('/order/verified/{id}', 'OrderController@verified');
	Route::get('/order/invoice/{id}', 'OrderController@invoice');
	Route::get('/order/delete/{id}', 'OrderController@deleteOrder');
	Route::get('/order/done/{id}', 'OrderController@finishOrder');
	Route::get('/order/receipt/{id}', 'OrderController@postReceipt');
	Route::post('/order/receipt/{id}', 'OrderController@updateReceipt');
	Route::get('/order/done', 'OrderController@doneOrder');

	Route::get('/discount', 'DiscountController@index');
	Route::post('/discount', 'DiscountController@addDiscount');
	Route::get('/discount/delete/{id}', 'DiscountController@deleteDiscount');

	Route::post('/send/newsletter', 'DashboardController@sendNewsletter');
	Route::get('/newsletter/delete/{id}', 'DashboardController@deleteNewsletter');
	Route::get('/jumbotron/update/{id}', 'DashboardController@updateJumbotron');
	Route::post('/jumbotron/update/{id}', 'DashboardController@postUpdateJumbotron');
});