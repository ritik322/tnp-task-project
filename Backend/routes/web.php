<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

Route::get('api/posts/', [PostController::class, 'index']);
Route::post('api/posts', [PostController::class, 'store']);
Route::delete('api/posts/{id}', [PostController::class, 'destroy']);
Route::put('api/posts/{id}',[PostController::class,'update']);
Route::post('api/register', [RegisterController::class, 'register']);
Route::post('api/login',[LoginController::class,"login"]);
Route::get('api/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
