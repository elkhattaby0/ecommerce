<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SearchHistory extends BaseModel
{
    public const UPDATED_AT = null;

    protected $table = 'search_history';

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
