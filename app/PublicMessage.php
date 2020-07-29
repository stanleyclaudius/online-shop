<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicMessage extends Model
{
	protected $table = 'public_messages';
	
    protected $fillable = ['user_id', 'icon', 'main_tagline', 'sub_tagline', 'is_read', 'link_page', 'discount_id'];
}
