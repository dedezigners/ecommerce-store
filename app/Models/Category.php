<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'slug', 'image', 'parent'
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

    public function parentCategoryName($id)
    {
        return $id ? $this->where('id', $id)->pluck('name')->first() : '-';
    }
}
