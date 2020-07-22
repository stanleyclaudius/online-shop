<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Signature extends Model
{
    protected $fillable = ['product_id'];
    public $timestamps = false;

    public function Product()
    {
    	return $this->belongsTo(Product::class);
    }
}
