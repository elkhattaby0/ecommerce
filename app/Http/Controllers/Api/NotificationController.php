<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $notifications = UserNotification::query()
            ->where('user_id', $request->user()->id)
            ->latest('created_at')
            ->limit(10)
            ->get()
            ->map(fn (UserNotification $notification) => [
                'id' => $notification->id,
                'type' => $notification->type,
                'title' => $notification->title,
                'body' => $notification->body,
                'is_read' => $notification->is_read,
                'read_at' => optional($notification->read_at)->toDateTimeString(),
                'created_at' => optional($notification->created_at)->toDateTimeString(),
            ]);

        return response()->json([
            'data' => $notifications,
            'unread_count' => $notifications->where('is_read', false)->count(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_unless($request->user()->isRole(['admin', 'ceo', 'support']), 403);

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'data' => ['nullable', 'array'],
        ]);

        $user = User::findOrFail($validated['user_id']);

        $notification = UserNotification::create([
            'user_id' => $user->id,
            'type' => $validated['type'],
            'title' => $validated['title'],
            'body' => $validated['body'] ?? null,
            'data' => isset($validated['data']) ? json_encode($validated['data']) : null,
        ]);

        return response()->json(['data' => $notification], 201);
    }

    public function markAsRead(Request $request, UserNotification $notification): JsonResponse
    {
        abort_unless($notification->user_id === $request->user()->id, 403);

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return response()->json(['message' => 'Notification marked as read.']);
    }
}
