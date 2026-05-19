<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\Role;
use App\Models\SearchHistory;
use App\Models\SellerProfile;
use App\Models\Shipping;
use App\Models\ShippingEvent;
use App\Models\Store;
use App\Models\Ticket;
use App\Models\TicketMessage;
use App\Models\User;
use App\Models\UserNotification;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoCommerceSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = Role::query()->pluck('id', 'name');

        $admin = $this->createUser($roles['admin'], 'Platform', 'Admin', 'admin@example.com');
        $ceo = $this->createUser($roles['ceo'], 'Executive', 'CEO', 'ceo@example.com');
        $manager = $this->createUser($roles['manager'], 'Catalog', 'Manager', 'manager@example.com');
        $support = $this->createUser($roles['support'], 'Customer', 'Support', 'support@example.com');
        $buyer = $this->createUser($roles['buyer'], 'Demo', 'Buyer', 'buyer@example.com');

        $freeStore = Store::create(['name' => 'Starter Tech', 'slug' => 'starter-tech', 'plan' => 'free', 'is_active' => true]);
        $proStore = Store::create(['name' => 'Pro Gadgets', 'slug' => 'pro-gadgets', 'plan' => 'pro', 'is_active' => true]);
        $premiumStore = Store::create(['name' => 'Premium Devices', 'slug' => 'premium-devices', 'plan' => 'premium', 'is_active' => true]);

        $freeSeller = $this->createUser($roles['seller'], 'Free', 'Seller', 'seller-free@example.com', $freeStore->id);
        $proSeller = $this->createUser($roles['seller'], 'Pro', 'Seller', 'seller-pro@example.com', $proStore->id);
        $premiumSeller = $this->createUser($roles['seller'], 'Premium', 'Seller', 'seller-premium@example.com', $premiumStore->id);

        $freeStore->update(['owner_id' => $freeSeller->id]);
        $proStore->update(['owner_id' => $proSeller->id]);
        $premiumStore->update(['owner_id' => $premiumSeller->id]);

        foreach ([[$freeSeller, $freeStore], [$proSeller, $proStore], [$premiumSeller, $premiumStore]] as [$seller, $store]) {
            SellerProfile::create([
                'user_id' => $seller->id,
                'store_id' => $store->id,
                'shop_name' => $store->name,
                'shop_description' => $store->name.' storefront',
                'rating' => 4.8,
                'total_sales' => 12,
                'is_verified' => true,
            ]);
        }

        $apple = Brand::create(['name' => 'Apple', 'slug' => 'apple']);
        $samsung = Brand::create(['name' => 'Samsung', 'slug' => 'samsung']);
        $sony = Brand::create(['name' => 'Sony', 'slug' => 'sony']);
        $xiaomi = Brand::create(['name' => 'Xiaomi', 'slug' => 'xiaomi']);

        $starterAccessories = Category::create(['store_id' => $freeStore->id, 'name' => 'Accessories', 'slug' => 'accessories', 'is_active' => true]);
        $starterAudio = Category::create(['store_id' => $freeStore->id, 'name' => 'Audio', 'slug' => 'audio', 'is_active' => true]);
        $proSmartphones = Category::create(['store_id' => $proStore->id, 'name' => 'Smartphones', 'slug' => 'smartphones', 'is_active' => true]);
        $proWearables = Category::create(['store_id' => $proStore->id, 'name' => 'Wearables', 'slug' => 'wearables', 'is_active' => true]);
        $premiumComputing = Category::create(['store_id' => $premiumStore->id, 'name' => 'Computing', 'slug' => 'computing', 'is_active' => true]);
        $premiumPremiumTech = Category::create(['store_id' => $premiumStore->id, 'name' => 'Premium Tech', 'slug' => 'premium-tech', 'is_active' => true]);

        $products = collect([
            [$freeStore, $freeSeller, $starterAccessories, $apple, 'USB-C Charger', 249.00, 'Fast charging adapter for phones and tablets'],
            [$freeStore, $freeSeller, $starterAudio, $samsung, 'Wireless Earbuds', 399.00, 'Compact Bluetooth earbuds with charging case'],
            [$freeStore, $freeSeller, $starterAccessories, $sony, 'Portable Power Bank 20000mAh', 329.00, 'High-capacity battery pack for daily travel'],
            [$freeStore, $freeSeller, $starterAccessories, $xiaomi, 'USB-C Braided Cable', 79.00, 'Durable cable for fast data and charging'],
            [$proStore, $proSeller, $proSmartphones, $apple, 'iPhone 14', 7999.00, 'Reliable Apple smartphone with strong camera performance'],
            [$proStore, $proSeller, $proSmartphones, $samsung, 'Galaxy S24', 6999.00, 'Modern Android flagship with vivid display'],
            [$proStore, $proSeller, $proWearables, $apple, 'Apple Watch SE', 3199.00, 'Smartwatch for fitness and notifications'],
            [$proStore, $proSeller, $proWearables, $sony, 'Sony WH-1000XM5', 4299.00, 'Premium noise cancelling over-ear headphones'],
            [$premiumStore, $premiumSeller, $premiumComputing, $apple, 'MacBook Air', 13999.00, 'Lightweight laptop with strong battery life'],
            [$premiumStore, $premiumSeller, $premiumPremiumTech, $apple, 'Apple Watch Ultra', 9999.00, 'Premium rugged smartwatch for outdoor use'],
            [$premiumStore, $premiumSeller, $premiumComputing, $apple, 'iPad Pro 11', 11299.00, 'High-end tablet for work and creativity'],
            [$premiumStore, $premiumSeller, $premiumPremiumTech, $samsung, 'Galaxy Tab S9 Ultra', 12499.00, 'Large premium Android tablet for multitasking'],
        ])->map(function (array $row, int $index) {
            [$store, $seller, $category, $brand, $name, $price, $description] = $row;

            return Product::create([
                'store_id' => $store->id,
                'seller_id' => $seller->id,
                'category_id' => $category->id,
                'brand_id' => $brand->id,
                'name' => $name,
                'slug' => str($name)->slug().'-'.$index,
                'description' => $description,
                'short_description' => $description,
                'base_price' => $price,
                'currency_code' => 'MAD',
                'condition' => 'new',
                'is_active' => true,
                'is_featured' => $index % 2 === 0,
                'published_at' => now(),
            ]);
        });

        foreach ($products as $product) {
            ProductVariant::create([
                'product_id' => $product->id,
                'sku' => 'SKU-'.$product->id,
                'label' => 'Default',
                'price_override' => $product->base_price,
                'stock' => 25,
                'is_active' => true,
            ]);

            ProductImage::create([
                'product_id' => $product->id,
                'url' => match (true) {
                    str_contains(strtolower($product->name), 'iphone') => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170&auto=format&fit=crop',
                    str_contains(strtolower($product->name), 'galaxy') => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1170&auto=format&fit=crop',
                    str_contains(strtolower($product->name), 'macbook') => 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1170&auto=format&fit=crop',
                    str_contains(strtolower($product->name), 'ipad') => 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1170&auto=format&fit=crop',
                    str_contains(strtolower($product->name), 'watch') => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1164&auto=format&fit=crop',
                    str_contains(strtolower($product->name), 'earbuds') => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop',
                    default => 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1170&auto=format&fit=crop',
                },
                'alt_text' => $product->name,
                'sort_order' => 0,
                'is_main' => true,
            ]);
        }

        $coupon = Coupon::create([
            'store_id' => $premiumStore->id,
            'code' => 'WELCOME10',
            'type' => 'percent',
            'value' => 10,
            'usage_limit' => 100,
            'per_user_limit' => 1,
            'is_active' => true,
        ]);

        $order = Order::create([
            'store_id' => $premiumStore->id,
            'user_id' => $buyer->id,
            'coupon_id' => $coupon->id,
            'shipping_full_name' => $buyer->name,
            'shipping_phone' => '+212600000000',
            'shipping_address_line1' => '123 Demo Street',
            'shipping_city' => 'Casablanca',
            'shipping_country_code' => 'MA',
            'subtotal' => 13999.00,
            'shipping_cost' => 0,
            'discount_amount' => 1000,
            'tax_amount' => 0,
            'total' => 12999.00,
            'currency_code' => 'MAD',
            'status' => 'processing',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $products[4]->id,
            'variant_id' => ProductVariant::query()->where('product_id', $products[4]->id)->value('id'),
            'seller_id' => $premiumSeller->id,
            'product_name' => $products[4]->name,
            'product_sku' => 'SKU-'.$products[4]->id,
            'variant_label' => 'Default',
            'unit_price' => 13999.00,
            'quantity' => 1,
            'subtotal' => 13999.00,
            'status' => 'processing',
        ]);

        Payment::create([
            'order_id' => $order->id,
            'user_id' => $buyer->id,
            'method' => 'card',
            'status' => 'paid',
            'amount' => 12999.00,
            'currency_code' => 'MAD',
            'transaction_id' => 'TXN-DEMO-001',
            'gateway' => 'stripe',
            'paid_at' => now(),
        ]);

        $shipping = Shipping::create([
            'order_id' => $order->id,
            'carrier' => 'Amana',
            'tracking_number' => 'AMN123456',
            'status' => 'shipped',
            'shipped_at' => now()->subDay(),
        ]);

        ShippingEvent::create([
            'shipping_id' => $shipping->id,
            'status' => 'shipped',
            'location' => 'Casablanca Hub',
            'description' => 'Package left the warehouse',
            'occurred_at' => now()->subDay(),
        ]);

        $wishlist = Wishlist::create(['user_id' => $buyer->id, 'name' => 'Default', 'is_public' => false]);
        WishlistItem::create(['wishlist_id' => $wishlist->id, 'product_id' => $products[2]->id]);

        $cart = Cart::create(['store_id' => $premiumStore->id, 'user_id' => $buyer->id, 'coupon_id' => $coupon->id]);
        CartItem::create(['cart_id' => $cart->id, 'product_id' => $products[5]->id, 'variant_id' => ProductVariant::query()->where('product_id', $products[5]->id)->value('id'), 'quantity' => 1, 'unit_price' => 9999]);

        SearchHistory::create(['store_id' => $premiumStore->id, 'user_id' => $buyer->id, 'query' => 'macbook air', 'results_count' => 3]);

        $ticket = Ticket::create([
            'user_id' => $buyer->id,
            'assigned_to' => $support->id,
            'order_id' => $order->id,
            'subject' => 'Where is my order?',
            'status' => 'open',
            'priority' => 'high',
            'last_message_at' => now(),
        ]);

        TicketMessage::create([
            'ticket_id' => $ticket->id,
            'user_id' => $buyer->id,
            'message' => 'Please help me track the delivery.',
        ]);

        foreach ([
            [$admin, 'system.alert', 'Platform overview updated', 'Your executive dashboard is ready.'],
            [$ceo, 'analytics.ready', 'Revenue snapshot ready', 'Payments and revenue analytics were refreshed.'],
            [$manager, 'catalog.alert', 'Catalog needs review', 'Two products are awaiting optimization.'],
            [$support, 'ticket.created', 'New ticket assigned', 'Ticket #'.$ticket->id.' requires attention.'],
            [$freeSeller, 'plan.free', 'Free plan active', 'Limited products and basic analytics are enabled.'],
            [$proSeller, 'plan.pro', 'Pro plan active', 'Ads tools and better analytics are enabled.'],
            [$premiumSeller, 'plan.premium', 'Premium plan active', 'Unlimited products and priority support are enabled.'],
            [$buyer, 'order.update', 'Order shipped', 'Your order #'.$order->id.' is on the way.'],
        ] as [$user, $type, $title, $body]) {
            UserNotification::create([
                'user_id' => $user->id,
                'type' => $type,
                'title' => $title,
                'body' => $body,
                'is_read' => false,
            ]);
        }
    }

    private function createUser(int $roleId, string $firstName, string $lastName, string $email, ?int $storeId = null): User
    {
        return User::query()->create([
            'store_id' => $storeId,
            'role_id' => $roleId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
    }
}
