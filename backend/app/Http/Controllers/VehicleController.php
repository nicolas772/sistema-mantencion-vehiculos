<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use App\Models\Vehicle;
use App\Models\VehicleOwnershipHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    public function index()
    {
        // Obtener todos los vehículos junto con la información del propietario
        $vehicles = Vehicle::with('owner')->get();

        if ($vehicles->isEmpty()) {
            return response()->json(['message' => 'No hay vehículos registrados'], 404);
        }

        // Mapear la colección para incluir solo la información necesaria
        $data = $vehicles->map(function ($vehicle) {
            return [
                'id' => $vehicle->id,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'license_plate' => $vehicle->license_plate,
                'year' => $vehicle->year,
                'price' => $vehicle->price,
                'owner' => [
                    'id' => $vehicle->owner_id,
                    'name' => $vehicle->owner->name,
                    'last_name' => $vehicle->owner->last_name,
                    'email' => $vehicle->owner->email,
                ]
            ];
        });

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|max:255',
            'model' => 'required|max:255',
            'license_plate' => 'required|max:255',
            'year' => 'required|integer|between:1900,2030',
            'owner_id' => 'required|exists:owners,id',
            'price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $vehicle = Vehicle::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'license_plate' => $request->license_plate,
            'year' => $request->year,
            'owner_id' => $request->owner_id,
            'price' => $request->price,
        ]);

        if (!$vehicle) {
            $data = [
                'message' => 'Error al crear el vehículo',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $vehicleHistoric = VehicleOwnershipHistory::create([
            'vehicle_id' => $vehicle->id,
            'owner_id' => $request->owner_id
        ]);

        if (!$vehicleHistoric) {
            $data = [
                'message' => 'Error al crear el historico del vehiculo',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'vehicle' => $vehicle,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $vehicle = Vehicle::with('owner')->find($id);

        if (!$vehicle) {
            $data = [
                'message' => 'Vehículo no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $data = [
            'vehicle' => [
                'id' => $vehicle->id,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'license_plate' => $vehicle->license_plate,
                'year' => $vehicle->year,
                'price' => $vehicle->price,
                'owner_id' => $vehicle->owner_id,
                'owner' => [
                    'name' => $vehicle->owner->name,
                    'last_name' => $vehicle->owner->last_name,
                    'email' => $vehicle->owner->email,
                ]
            ],
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $vehicle = Vehicle::with('owner')->find($id);

        if (!$vehicle) {
            $data = [
                'message' => 'Vehículo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'brand' => 'max:255',
            'model' => 'max:255',
            'license_plate' => 'max:255',
            'year' => 'integer|between:1900,2030',
            'owner_id' => 'exists:owners,id',
            'price' => 'numeric'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('brand')) {
            $vehicle->brand = $request->brand;
        }

        if ($request->has('model')) {
            $vehicle->model = $request->model;
        }

        if ($request->has('license_plate')) {
            $vehicle->license_plate = $request->license_plate;
        }

        if ($request->has('year')) {
            $vehicle->year = $request->year;
        }

        if ($request->has('owner_id') && $vehicle->owner_id !== $request->owner_id) {
            VehicleOwnershipHistory::create([
                'vehicle_id' => $vehicle->id,
                'owner_id' => $request->owner_id
            ]);
            $vehicle->owner_id = $request->owner_id;
        }

        if ($request->has('price')) {
            $vehicle->price = $request->price;
        }

        $vehicle->save();
        $vehicle->load('owner');

        $data = [
            'message' => 'Vehículo actualizado',
            'vehicle' => [
                'id' => $vehicle->id,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'license_plate' => $vehicle->license_plate,
                'year' => $vehicle->year,
                'price' => $vehicle->price,
                'owner_id' => $vehicle->owner_id,
                'owner' => [
                    'name' => $vehicle->owner->name,
                    'last_name' => $vehicle->owner->last_name,
                    'email' => $vehicle->owner->email,
                ]
            ],
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function delete($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            $data = [
                'message' => 'Vehiculo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $vehicle->delete();

        $data = [
            'message' => 'Vehículo eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }
    
    public function getHistoricOwnership($id)
    {
        $ownershipHistory = VehicleOwnershipHistory::where('vehicle_id', $id)
            ->orderBy('created_at', 'asc')
            ->get();

        if ($ownershipHistory->isEmpty()) {
            return response()->json([
                'message' => 'No se encontró historial de propietarios para el vehículo especificado.',
                'status' => 404
            ], 404);
        }

        $historicData = $ownershipHistory->map(function ($history, $index) {
            $owner = Owner::find($history->owner_id);
            
            if (!$owner) {
                return [
                    'error' => 'Propietario no encontrado',
                    'status' => 404
                ];
            }

            return [
                'n_owner' => $index + 1,
                'owner' => [
                    'name' => $owner->name,
                    'last_name' => $owner->last_name,
                    'email' => $owner->email
                ],
                'date' => $history->created_at
            ];
        });

        return response()->json([
            'message' => 'Historial de propietarios obtenido exitosamente.',
            'data' => $historicData,
            'status' => 200
        ], 200);
    }

}
