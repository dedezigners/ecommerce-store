<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    protected $fillable = [
        'name', 'type', 'path'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function($category) {
            $category->user_id = auth()->id();
        });
    }

    public function getLinkAttribute()
    {
        return asset('storage/' . $this->path);
    }
}
