<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title', 'imgPrimary', 'imgSecondary', 'price', 'salePrice',
        'isNew', 'onSale', 'isStock', 'countdownDate',
        'category_id', 'description', 'status'
    ];

    protected $casts = [
        'isNew' => 'boolean',
        'onSale' => 'boolean',
        'isStock' => 'boolean',
        'countdownDate' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
