<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Category extends Model
{
	use Sluggable;

    protected $fillable = ['category', 'icon', 'section', 'slug'];
    public $timestamps = false;

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'category'
            ]
        ];
    }

    public function Product()
    {
    	return $this->belongsToMany(Product::class);
    }
}
