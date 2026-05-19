<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketMessage;
use App\Models\UserNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user()->loadMissing('role');

        $query = Ticket::query()
            ->with(['user:id,first_name,last_name', 'assignee:id,first_name,last_name'])
            ->latest()
            ->limit(8);

        if ($user->isRole('support')) {
            $query->where(function ($builder) use ($user) {
                $builder->whereNull('assigned_to')->orWhere('assigned_to', $user->id);
            });
        } elseif (! $user->isRole(['admin', 'ceo', 'manager'])) {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'data' => $query->get()->map(fn (Ticket $ticket) => [
                'id' => $ticket->id,
                'subject' => $ticket->subject,
                'status' => $ticket->status,
                'priority' => $ticket->priority,
                'customer' => $ticket->user?->name,
                'assignee' => $ticket->assignee?->name,
                'last_message_at' => optional($ticket->last_message_at)->toDateTimeString(),
            ]),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'order_id' => ['nullable', 'exists:orders,id'],
        ]);

        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'order_id' => $validated['order_id'] ?? null,
            'subject' => $validated['subject'],
            'priority' => $validated['priority'],
            'status' => 'open',
            'last_message_at' => now(),
        ]);

        TicketMessage::create([
            'ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
            'is_internal' => false,
        ]);

        $supportUsers = \App\Models\User::query()
            ->whereHas('role', fn ($query) => $query->whereIn('name', ['support', 'admin']))
            ->get();

        foreach ($supportUsers as $supportUser) {
            UserNotification::create([
                'user_id' => $supportUser->id,
                'type' => 'ticket.created',
                'title' => 'New support ticket',
                'body' => "Ticket #{$ticket->id}: {$ticket->subject}",
                'data' => json_encode(['ticket_id' => $ticket->id]),
            ]);
        }

        return response()->json([
            'message' => 'Ticket created successfully.',
            'data' => $ticket,
        ], 201);
    }

    public function update(Request $request, Ticket $ticket): JsonResponse
    {
        $user = $request->user()->loadMissing('role');

        abort_unless(
            $user->isRole(['admin', 'support']) ||
            $ticket->user_id === $user->id,
            403
        );

        $validated = $request->validate([
            'status' => ['nullable', Rule::in(['open', 'pending', 'resolved'])],
            'assigned_to' => ['nullable', 'exists:users,id'],
            'message' => ['nullable', 'string'],
            'is_internal' => ['nullable', 'boolean'],
        ]);

        $ticket->update([
            'status' => $validated['status'] ?? $ticket->status,
            'assigned_to' => $validated['assigned_to'] ?? $ticket->assigned_to,
            'last_message_at' => isset($validated['message']) ? now() : $ticket->last_message_at,
        ]);

        if (! empty($validated['message'])) {
            TicketMessage::create([
                'ticket_id' => $ticket->id,
                'user_id' => $user->id,
                'message' => $validated['message'],
                'is_internal' => (bool) ($validated['is_internal'] ?? false),
            ]);
        }

        return response()->json(['message' => 'Ticket updated successfully.']);
    }
}
