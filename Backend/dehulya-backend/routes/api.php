<?php

use App\Http\Controllers\Api\CategoryConntroller;
use App\Http\Controllers\Api\ProductConntroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('products', ProductConntroller::class);
Route::apiResource('categories', CategoryConntroller::class);

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
