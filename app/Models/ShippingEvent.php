<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingEvent extends BaseModel
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'occurred_at' => 'datetime',
        ];
    }

    public function shipping(): BelongsTo
    {
        return $this->belongsTo(Shipping::class);
    }
}
