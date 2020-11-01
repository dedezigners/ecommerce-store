<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Account',
            'email' => 'admin@dede.com',
            'username' => 'admin',
            'password' => 'password',
            'is_admin' => 1
        ]);

        User::create([
            'first_name' => 'Customer',
            'last_name' => 'Account',
            'email' => 'customer@dede.com',
            'username' => 'customer',
            'password' => 'password'
        ]);
    }
}
