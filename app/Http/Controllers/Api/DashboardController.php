<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user()->loadMissing('role.permissions', 'store');
        $role = $user->roleName() ?? 'buyer';
        $plan = $user->dashboardPlan();

        $metrics = match ($role) {
            'admin' => $this->adminMetrics(),
            'ceo' => $this->ceoMetrics(),
            'manager' => $this->managerMetrics(),
            'support' => $this->supportMetrics(),
            'seller' => $this->sellerMetrics($user->id),
            default => $this->buyerMetrics($user->id),
        };

        return response()->json([
            'role' => $role,
            'plan' => $plan,
            'permissions' => $user->role?->permissions->pluck('name')->values()->all() ?? [],
            'metrics' => $metrics,
            'actions' => $this->actionsFor($role, $plan),
            'features' => $this->featuresFor($role, $plan),
        ]);
    }

    private function adminMetrics(): array
    {
        return [
            ['label' => 'Users', 'value' => User::count(), 'tone' => 'primary'],
            ['label' => 'Stores', 'value' => Store::count(), 'tone' => 'neutral'],
            ['label' => 'Orders', 'value' => Order::count(), 'tone' => 'success'],
            ['label' => 'Open Tickets', 'value' => Ticket::where('status', 'open')->count(), 'tone' => 'warning'],
        ];
    }

    private function ceoMetrics(): array
    {
        return [
            ['label' => 'Revenue', 'value' => number_format((float) Order::sum('total'), 2).' MAD', 'tone' => 'success'],
            ['label' => 'Payments', 'value' => number_format((float) \App\Models\Payment::sum('amount'), 2).' MAD', 'tone' => 'primary'],
            ['label' => 'Users', 'value' => User::count(), 'tone' => 'neutral'],
            ['label' => 'Analytics Events', 'value' => \App\Models\ProductView::count() + \App\Models\SearchHistory::count(), 'tone' => 'warning'],
        ];
    }

    private function managerMetrics(): array
    {
        return [
            ['label' => 'Products', 'value' => Product::count(), 'tone' => 'primary'],
            ['label' => 'Active Products', 'value' => Product::where('is_active', true)->count(), 'tone' => 'success'],
            ['label' => 'Orders', 'value' => Order::count(), 'tone' => 'neutral'],
            ['label' => 'Sellers', 'value' => User::whereHas('role', fn ($query) => $query->where('name', 'seller'))->count(), 'tone' => 'warning'],
        ];
    }

    private function supportMetrics(): array
    {
        return [
            ['label' => 'Open Tickets', 'value' => Ticket::where('status', 'open')->count(), 'tone' => 'warning'],
            ['label' => 'Assigned To Me', 'value' => Ticket::where('assigned_to', auth()->id())->count(), 'tone' => 'primary'],
            ['label' => 'Resolved Tickets', 'value' => Ticket::where('status', 'resolved')->count(), 'tone' => 'success'],
            ['label' => 'Customers', 'value' => User::whereHas('role', fn ($query) => $query->whereIn('name', ['buyer', 'seller']))->count(), 'tone' => 'neutral'],
        ];
    }

    private function sellerMetrics(int $userId): array
    {
        $orderIds = Order::query()
            ->whereHas('items', fn ($query) => $query->where('seller_id', $userId))
            ->pluck('id');

        return [
            ['label' => 'My Products', 'value' => Product::where('seller_id', $userId)->count(), 'tone' => 'primary'],
            ['label' => 'Orders', 'value' => $orderIds->count(), 'tone' => 'neutral'],
            ['label' => 'Revenue', 'value' => number_format((float) Order::whereIn('id', $orderIds)->sum('total'), 2).' MAD', 'tone' => 'success'],
            ['label' => 'Open Tickets', 'value' => Ticket::where('user_id', $userId)->where('status', 'open')->count(), 'tone' => 'warning'],
        ];
    }

    private function buyerMetrics(int $userId): array
    {
        return [
            ['label' => 'My Orders', 'value' => Order::where('user_id', $userId)->count(), 'tone' => 'primary'],
            ['label' => 'Wishlist', 'value' => \App\Models\WishlistItem::whereHas('wishlist', fn ($query) => $query->where('user_id', $userId))->count(), 'tone' => 'neutral'],
            ['label' => 'Searches', 'value' => \App\Models\SearchHistory::where('user_id', $userId)->count(), 'tone' => 'success'],
            ['label' => 'Support Tickets', 'value' => Ticket::where('user_id', $userId)->count(), 'tone' => 'warning'],
        ];
    }

    private function actionsFor(string $role, ?string $plan): array
    {
        $actions = match ($role) {
            'admin' => ['Manage platform', 'Manage payments', 'Manage users', 'Analytics'],
            'ceo' => ['Full access', 'Revenue overview', 'Platform analytics', 'Team oversight'],
            'manager' => ['Manage products', 'Manage orders', 'Manage sellers', 'Catalog health'],
            'support' => ['Manage tickets', 'Help customers', 'Escalate issues', 'SLA tracking'],
            'seller' => ['Manage products', 'Review orders', 'Track analytics', 'Run promotions'],
            default => ['Browse products', 'Track orders', 'Open ticket', 'Manage wishlist'],
        };

        if ($role === 'seller' && $plan) {
            $actions[] = strtoupper($plan).' plan';
        }

        return $actions;
    }

    private function featuresFor(string $role, ?string $plan): array
    {
        if ($role !== 'seller') {
            return [];
        }

        return match ($plan) {
            'premium' => ['Unlimited products', 'Priority support', 'Advanced marketing'],
            'pro' => ['More products', 'Better analytics', 'Ads tools'],
            default => ['Limited products', 'Basic analytics'],
        };
    }
}
