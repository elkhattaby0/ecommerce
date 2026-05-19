<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WishlistItem extends BaseModel
{
    public const CREATED_AT = 'added_at';

    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'added_at' => 'datetime',
        ];
    }

    public function wishlist(): BelongsTo
    {
        return $this->belongsTo(Wishlist::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}
