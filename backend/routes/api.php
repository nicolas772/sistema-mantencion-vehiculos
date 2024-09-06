<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OwnerController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\VehicleController;

// Rutas para Owners

Route::get('/owners', [OwnerController::class, 'index']);

Route::get('/owners/{id}', [OwnerController::class, 'show']);

Route::post('/owners', [OwnerController::class, 'store']);

Route::put('/owners/{id}', [OwnerController::class, 'updatePartial']);

Route::delete('/owners/{id}', [OwnerController::class, 'delete']);

// Rutas para Vehiculos

Route::get('/vehicles', [VehicleController::class, 'index']);

Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

Route::post('/vehicles', [VehicleController::class, 'store']);

Route::put('/vehicles/{id}', [VehicleController::class, 'updatePartial']);

Route::delete('/vehicles/{id}', [VehicleController::class, 'delete']);

Route::get('/vehicles/historic/{id}', [VehicleController::class, 'getHistoricOwnership']);

// Ruta para carga masiva de Excel

Route::post('/upload', [UploadController::class, 'store']);
