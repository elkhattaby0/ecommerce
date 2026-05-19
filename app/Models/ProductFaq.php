<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductFaq extends BaseModel
{
    public const UPDATED_AT = null;

    protected $table = 'product_faq';

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function asker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'asked_by');
    }

    public function answerer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'answered_by');
    }
}
