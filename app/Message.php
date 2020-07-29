<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['user_id', 'icon', 'main_tagline', 'sub_tagline', 'is_read', 'link_page'];
}
