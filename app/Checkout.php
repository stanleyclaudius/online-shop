<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    protected $fillable = ['user_id', 'total', 'discount', 'order_code', 'status', 'receipt', 'shipping_id', 'product_id', 'is_done'];

    public function User()
    {
    	return $this->belongsTo(User::class);
    }

    public function Shipping()
    {
    	return $this->belongsTo(Shipping::class);
    }
}
