<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = [
            'full_access',
            'manage_platform',
            'manage_payments',
            'manage_users',
            'analytics',
            'manage_products',
            'manage_orders',
            'manage_sellers',
            'manage_tickets',
            'help_customers',
        ];

        foreach ($permissions as $permission) {
            Permission::query()->firstOrCreate(
                ['name' => $permission],
                ['description' => str_replace('_', ' ', $permission)]
            );
        }

        $roles = [
            'admin' => $permissions,
            'ceo' => ['full_access', 'manage_platform', 'manage_payments', 'manage_users', 'analytics'],
            'manager' => ['manage_products', 'manage_orders', 'manage_sellers'],
            'support' => ['manage_tickets', 'help_customers'],
            'seller' => [],
            'buyer' => [],
        ];

        foreach ($roles as $name => $rolePermissions) {
            $role = Role::query()->firstOrCreate(
                ['name' => $name],
                ['description' => ucfirst($name).' dashboard role']
            );

            $role->permissions()->sync(
                Permission::query()->whereIn('name', $rolePermissions)->pluck('id')->all()
            );
        }
    }
}
