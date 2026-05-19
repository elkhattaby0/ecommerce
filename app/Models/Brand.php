<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends BaseModel
{
    public $timestamps = false;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
