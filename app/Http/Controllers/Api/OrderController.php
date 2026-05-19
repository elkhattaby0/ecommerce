<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user()->loadMissing('role');

        $query = Order::query()
            ->with(['user:id,first_name,last_name', 'store:id,name'])
            ->latest()
            ->limit(8);

        if ($user->isRole('buyer')) {
            $query->where('user_id', $user->id);
        }

        if ($user->isRole('seller')) {
            $query->whereHas('items', fn ($builder) => $builder->where('seller_id', $user->id));
        }

        return response()->json([
            'data' => $query->get()->map(fn (Order $order) => [
                'id' => $order->id,
                'customer' => $order->user?->name,
                'store' => $order->store?->name,
                'status' => $order->status,
                'total' => $order->total,
                'currency_code' => $order->currency_code,
                'created_at' => optional($order->created_at)->toDateTimeString(),
            ]),
        ]);
    }

    public function update(Request $request, Order $order): JsonResponse
    {
        abort_unless($request->user()->isRole(['admin', 'ceo', 'manager', 'support', 'seller']), 403);

        if ($request->user()->isRole('seller')) {
            abort_unless($order->items()->where('seller_id', $request->user()->id)->exists(), 403);
        }

        $validated = $request->validate([
            'status' => ['required', 'in:pending,processing,shipped,delivered,cancelled,resolved'],
        ]);

        $order->update([
            'status' => $validated['status'],
            'cancelled_at' => $validated['status'] === 'cancelled' ? now() : null,
        ]);

        $order->statusHistory()->create([
            'status' => $validated['status'],
            'note' => 'Updated from dashboard',
            'changed_by' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Order updated successfully.']);
    }
}
