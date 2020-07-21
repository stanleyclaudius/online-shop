<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
	protected $fillable = ['menu'];
    public $timestamps = false;

    public function Submenu()
    {
    	return $this->hasMany(Submenu::class);
    }
}
