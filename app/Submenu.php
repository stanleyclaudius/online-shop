<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $fillable = ['menu_id', 'submenu', 'icon', 'link'];
    public $timestamps = false;
}
