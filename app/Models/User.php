<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_id',
        'role_id',
        'first_name',
        'last_name',
        'name',
        'email',
        'phone',
        'avatar_url',
        'password',
        'password_hash',
        'gender',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'deleted_at' => 'datetime',
            'is_active' => 'boolean',
            'password_hash' => 'hashed',
        ];
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn () => trim("{$this->first_name} {$this->last_name}"),
            set: function (string $value): array {
                $parts = preg_split('/\s+/', trim($value), 2) ?: [];

                return [
                    'first_name' => $parts[0] ?? '',
                    'last_name' => $parts[1] ?? '',
                ];
            },
        );
    }

    protected function password(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->password_hash,
            set: fn (string $value) => ['password_hash' => $value],
        );
    }

    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function ownedStores(): HasMany
    {
        return $this->hasMany(Store::class, 'owner_id');
    }

    public function sellerProfile(): HasOne
    {
        return $this->hasOne(SellerProfile::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(UserAddress::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'seller_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(UserNotification::class);
    }

    public function assignedTickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'assigned_to');
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function ticketMessages(): HasMany
    {
        return $this->hasMany(TicketMessage::class);
    }

    public function roleName(): ?string
    {
        return $this->role?->name;
    }

    public function isRole(string|array $roles): bool
    {
        $roles = (array) $roles;

        return in_array($this->roleName(), $roles, true);
    }

    public function hasPermission(string $permission): bool
    {
        if ($this->isRole('admin')) {
            return true;
        }

        return $this->role?->permissions->contains('name', $permission) ?? false;
    }

    public function dashboardPlan(): ?string
    {
        return $this->store?->plan;
    }
}
