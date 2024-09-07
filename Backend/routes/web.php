<?php

use App\Http\Controllers\PostController;

Route::get('api/posts', [PostController::class, 'index']);
Route::post('api/posts', [PostController::class, 'store']);
Route::delete('api/posts/{id}', [PostController::class, 'destroy']);
Route::put('api/posts/{id}',[PostController::class,'update']);

Route::get('api/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});