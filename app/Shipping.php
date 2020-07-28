<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $fillable = ['name', 'checkout_id', 'phone', 'country', 'province', 'city', 'address','is_done'];
}
