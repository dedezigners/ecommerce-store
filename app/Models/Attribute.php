<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = [
        'name', 'slug', 'tags'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function($category) {
            $category->user_id = auth()->id();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
