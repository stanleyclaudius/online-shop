<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['user_id', 'product_id', 'review', 'star', 'is_review', 'name', 'email'];

    public function User()
    {
    	return $this->belongsTo(User::class);
    }
}
