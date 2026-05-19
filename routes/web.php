<?php

use App\Http\Controllers\Api\DashboardController as ApiDashboardController;
use App\Http\Controllers\Api\NotificationController as ApiNotificationController;
use App\Http\Controllers\Api\OrderController as ApiOrderController;
use App\Http\Controllers\Api\ProductController as ApiProductController;
use App\Http\Controllers\Api\SellerController as ApiSellerController;
use App\Http\Controllers\Api\TicketController as ApiTicketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorefrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [StorefrontController::class, 'welcome']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/products', [StorefrontController::class, 'products'])->name('products.index');
Route::get('/details/{product:slug}', [StorefrontController::class, 'productDetails'])->name('details.show');
Route::get('/mes-recherches', function () {
    return Inertia::render('Customer/Searches');
})->middleware('auth')->name('searches.index');
Route::get('/favoris', function () {
    return Inertia::render('Customer/Favorites');
})->middleware('auth')->name('favorites.index');
Route::get('/panier', function () {
    return Inertia::render('Customer/Cart');
})->name('cart.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('api')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', ApiDashboardController::class)->name('api.dashboard');
    Route::get('/products', [ApiProductController::class, 'index'])->name('api.products.index');
    Route::post('/products', [ApiProductController::class, 'store'])->name('api.products.store');
    Route::patch('/products/{product}', [ApiProductController::class, 'update'])->name('api.products.update');
    Route::delete('/products/{product}', [ApiProductController::class, 'destroy'])->name('api.products.destroy');
    Route::get('/orders', [ApiOrderController::class, 'index'])->name('api.orders.index');
    Route::patch('/orders/{order}', [ApiOrderController::class, 'update'])->name('api.orders.update');
    Route::get('/sellers', [ApiSellerController::class, 'index'])->name('api.sellers.index');
    Route::patch('/sellers/{seller}', [ApiSellerController::class, 'update'])->name('api.sellers.update');
    Route::get('/tickets', [ApiTicketController::class, 'index'])->name('api.tickets.index');
    Route::post('/tickets', [ApiTicketController::class, 'store'])->name('api.tickets.store');
    Route::patch('/tickets/{ticket}', [ApiTicketController::class, 'update'])->name('api.tickets.update');
    Route::get('/notifications', [ApiNotificationController::class, 'index'])->name('api.notifications.index');
    Route::post('/notifications', [ApiNotificationController::class, 'store'])->name('api.notifications.store');
    Route::patch('/notifications/{notification}/read', [ApiNotificationController::class, 'markAsRead'])->name('api.notifications.read');
});

require __DIR__.'/auth.php';
