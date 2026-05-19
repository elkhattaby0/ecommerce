<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('Welcome', [
            'featuredProducts' => $this->mapProducts(
                Product::query()->where('is_active', true)->latest()->limit(8)->get()
            ),
            'categories' => Category::query()
                ->where('is_active', true)
                ->select('id', 'name', 'slug')
                ->limit(8)
                ->get()
                ->map(fn (Category $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                ]),
        ]);
    }

    public function products(Request $request): Response
    {
        $query = Product::query()
            ->with(['category:id,name,slug', 'store:id,name'])
            ->where('is_active', true);

        if ($request->filled('q')) {
            $search = $request->string('q')->toString();
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('category', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($builder) => $builder->where('slug', $request->string('category')->toString()));
        }

        $products = $query->latest()->get();

        return Inertia::render('Products/Index', [
            'products' => $this->mapProducts($products),
            'spotlightProducts' => $this->mapProducts($products->take(4)),
            'filters' => [
                'q' => $request->string('q')->toString(),
                'category' => $request->string('category')->toString(),
            ],
            'categories' => Category::query()
                ->where('is_active', true)
                ->select('id', 'name', 'slug')
                ->get(),
        ]);
    }

    public function productDetails(Product $product): Response
    {
        $product->load(['category:id,name,slug', 'brand:id,name', 'store:id,name', 'variants:id,product_id,label,price_override,stock']);

        return Inertia::render('Details/Index', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => (float) $product->base_price,
                'currency' => $product->currency_code,
                'category' => $product->category?->name,
                'brand' => $product->brand?->name,
                'store' => $product->store?->name,
                'condition' => $product->condition,
                'stock' => $product->variants->sum('stock'),
                'image' => $this->imageFor($product),
            ],
            'relatedProducts' => $this->mapProducts(
                Product::query()
                    ->where('id', '!=', $product->id)
                    ->where('category_id', $product->category_id)
                    ->where('is_active', true)
                    ->latest()
                    ->limit(5)
                    ->get()
            ),
        ]);
    }

    private function mapProducts($products)
    {
        return $products->map(fn (Product $product) => [
            'id' => $product->id,
            'slug' => $product->slug,
            'image' => $this->imageFor($product),
            'flags' => array_values(array_filter([
                $product->is_featured ? 'Top ventes' : null,
                'Livraison rapide',
            ])),
            'title' => $product->name,
            'info' => array_values(array_filter([
                $product->category?->name,
                $product->store?->name,
            ])),
            'variant' => $product->brand?->name,
            'trust' => 'Paiement securise',
            'colorDots' => ['var(--Primary)', 'var(--Secondary)', 'var(--Accent)'],
            'nbrAvis' => 120,
            'oldPrice' => round(((float) $product->base_price) * 1.15, 2),
            'price' => (float) $product->base_price,
            'currency' => $product->currency_code,
        ]);
    }

    private function imageFor(Product $product): string
    {
        return $product->images()->value('url')
            ?: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170&auto=format&fit=crop';
    }
}
