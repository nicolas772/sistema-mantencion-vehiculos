<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OwnerController;

// Rutas para Owners

Route::get('/owners', [OwnerController::class, 'index']);

Route::get('/owners/{id}', [OwnerController::class, 'show']);

Route::post('/owners', [OwnerController::class, 'store']);

Route::put('/owners/{id}', [OwnerController::class, 'updatePartial']);

Route::delete('/owners/{id}', [OwnerController::class, 'delete']);

// Rutas para Vehiculos

Route::get('/cars', function () {
    return "Lista de autos";
});

Route::get('/cars/{id}', function () {
    return "Obteniendo auto por id";
});

Route::post('/cars', function () {
    return "creando auto";
});

Route::put('/cars/{id}', function () {
    return "actualizando auto";
});

Route::delete('/cars/{id}', function () {
    return "eliminando auto";
});
