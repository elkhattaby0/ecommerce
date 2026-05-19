<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_fetch_dashboard_payload(): void
    {
        $role = Role::create([
            'name' => 'seller',
            'description' => 'Seller role',
        ]);

        $user = User::factory()->create([
            'role_id' => $role->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson('/api/dashboard');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'role',
                'plan',
                'permissions',
                'metrics',
                'actions',
                'features',
            ]);
    }

    public function test_user_can_mark_their_notification_as_read(): void
    {
        $user = User::factory()->create();

        $notification = UserNotification::create([
            'user_id' => $user->id,
            'type' => 'order.update',
            'title' => 'Order updated',
            'body' => 'Your order changed status.',
            'is_read' => false,
        ]);

        $this
            ->actingAs($user)
            ->patchJson("/api/notifications/{$notification->id}/read")
            ->assertOk();

        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'is_read' => true,
        ]);
    }
}
