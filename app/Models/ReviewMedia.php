<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewMedia extends BaseModel
{
    protected $table = 'review_media';

    public $timestamps = false;

    public function review(): BelongsTo
    {
        return $this->belongsTo(ProductReview::class, 'review_id');
    }
}
