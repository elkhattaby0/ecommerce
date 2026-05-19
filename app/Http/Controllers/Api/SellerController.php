<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        abort_unless($request->user()->isRole(['admin', 'ceo', 'manager']), 403);

        $sellers = User::query()
            ->with(['store:id,name,plan,is_active', 'sellerProfile:id,user_id,rating,total_sales,is_verified'])
            ->whereHas('role', fn ($query) => $query->where('name', 'seller'))
            ->latest()
            ->get()
            ->map(fn (User $seller) => [
                'id' => $seller->id,
                'name' => $seller->name,
                'email' => $seller->email,
                'plan' => $seller->store?->plan,
                'store' => $seller->store?->name,
                'is_active' => $seller->is_active,
                'is_verified' => $seller->sellerProfile?->is_verified ?? false,
                'rating' => $seller->sellerProfile?->rating,
                'total_sales' => $seller->sellerProfile?->total_sales ?? 0,
            ]);

        return response()->json(['data' => $sellers]);
    }

    public function update(Request $request, User $seller): JsonResponse
    {
        abort_unless($request->user()->isRole(['admin', 'ceo', 'manager']), 403);
        abort_unless($seller->isRole('seller'), 404);

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
            'plan' => ['nullable', 'in:free,pro,premium'],
            'is_verified' => ['nullable', 'boolean'],
        ]);

        $seller->update([
            'is_active' => $validated['is_active'],
        ]);

        if (isset($validated['plan']) && $seller->store) {
            $seller->store->update(['plan' => $validated['plan']]);
        }

        if (array_key_exists('is_verified', $validated)) {
            $seller->sellerProfile()->updateOrCreate(
                ['user_id' => $seller->id],
                ['store_id' => $seller->store_id, 'is_verified' => $validated['is_verified']]
            );
        }

        return response()->json(['message' => 'Seller updated successfully.']);
    }
}
