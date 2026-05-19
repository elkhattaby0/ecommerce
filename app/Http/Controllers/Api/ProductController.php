<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Support\UserFallback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user()->loadMissing('role');

        $query = Product::query()
            ->with(['category:id,name', 'store:id,name,plan'])
            ->latest()
            ->limit(8);

        if ($user->isRole('seller')) {
            $query->where('seller_id', $user->id);
        }

        if ($user->isRole('buyer')) {
            $query->where('is_active', true);
        }

        return response()->json([
            'data' => $query->get()->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->base_price,
                'currency_code' => $product->currency_code,
                'store' => $product->store?->name,
                'plan' => $product->store?->plan,
                'category' => $product->category?->name,
                'status' => $product->is_active ? 'active' : 'draft',
            ]),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user()->loadMissing('store');
        abort_unless($user->isRole(['admin', 'manager', 'seller']), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'currency_code' => ['required', 'string', 'max:10'],
            'condition' => ['required', 'string', 'max:100'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'description' => ['nullable', 'string'],
        ]);

        $storeId = $user->store_id ?? \App\Models\Store::query()->value('id');
        $categoryId = $validated['category_id'] ?? Category::query()->where('store_id', $storeId)->value('id');
        $brandId = $validated['brand_id'] ?? Brand::query()->value('id');

        $product = Product::create([
            'store_id' => $storeId,
            'seller_id' => $user->isRole('seller') ? $user->id : UserFallback::idForSeller(),
            'category_id' => $categoryId,
            'brand_id' => $brandId,
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'short_description' => $validated['description'] ?? null,
            'base_price' => $validated['base_price'],
            'currency_code' => $validated['currency_code'],
            'condition' => $validated['condition'],
            'is_active' => true,
            'published_at' => now(),
        ]);

        return response()->json(['data' => $product], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $user = $request->user();
        abort_unless($user->isRole(['admin', 'manager']) || ($user->isRole('seller') && $product->seller_id === $user->id), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:active,draft'],
        ]);

        $product->update([
            'name' => $validated['name'],
            'base_price' => $validated['base_price'],
            'is_active' => $validated['status'] === 'active',
        ]);

        return response()->json(['message' => 'Product updated successfully.']);
    }

    public function destroy(Request $request, Product $product): JsonResponse
    {
        $user = $request->user();
        abort_unless($user->isRole(['admin', 'manager']) || ($user->isRole('seller') && $product->seller_id === $user->id), 403);

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
