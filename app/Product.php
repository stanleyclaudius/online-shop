<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['product_name', 'product_description', 'product_spec', 'product_price', 'product_iamge', 'product_rating'];

    public function Category()
    {
    	return $this->belongsToMany(Category::class);
    }
}
