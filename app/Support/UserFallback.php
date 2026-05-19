<?php

namespace App\Support;

use App\Models\User;

class UserFallback
{
    public static function idForSeller(): int
    {
        return User::query()
            ->whereHas('role', fn ($query) => $query->where('name', 'seller'))
            ->value('id') ?? User::query()->value('id');
    }
}
