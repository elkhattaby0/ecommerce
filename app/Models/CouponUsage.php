<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CouponUsage extends BaseModel
{
    public const CREATED_AT = 'used_at';

    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'discount_amount' => 'decimal:2',
            'used_at' => 'datetime',
        ];
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
