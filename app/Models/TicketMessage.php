<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketMessage extends BaseModel
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'is_internal' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
