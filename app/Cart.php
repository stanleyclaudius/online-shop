<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'product_id', 'qty', 'total', 'show_cart', 'checkout_id'];

    public function Product()
    {
    	return $this->belongsTo(Product::class);
    }
}
