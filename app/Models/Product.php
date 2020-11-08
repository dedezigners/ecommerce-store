<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'sku', 'price', 'stat', 'on_sale', 'sale_price', 'started', 'ended', 'attributes', 'short_intro', 'detail_intro', 'featured', 'secondary'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function($product) {
            $product->user_id = auth()->id();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
