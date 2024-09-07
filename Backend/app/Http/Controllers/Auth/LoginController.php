<?php

namespace App\Http\Controllers\Auth;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\User; 

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
  

    
            // Attempt to authenticate the user
            $user = User::where('username', $validatedData['username'])->first();

        // Check if user exists and passwords match (plaintext comparison)
        if ($user && $user->password === $validatedData['password']) {
            // Password matches
            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200);
        }
       
            return response()->json(['error' => 'Username or Password is incorrect'], 400);
        
        
    }
}
