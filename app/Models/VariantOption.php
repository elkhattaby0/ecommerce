<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VariantOption extends BaseModel
{
    public $timestamps = false;

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}
