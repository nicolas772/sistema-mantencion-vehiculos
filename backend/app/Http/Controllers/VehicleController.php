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
        $vehicles = Vehicle::all();
        if ($vehicles->isEmpty()) {
            return response()->json(['message' => 'No hay vehiculos registrados'], 404);
        }
        return response()->json($vehicles, 200);
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
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            $data = [
                'messsage' => 'Vehiculo no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $data = [
            'vehicle' => $vehicle,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);

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
            $vehicleHistoric = VehicleOwnershipHistory::create([
                'vehicle_id' => $vehicle->id,
                'owner_id' => $request->owner_id
            ]);
            if (!$vehicleHistoric) {
                $data = [
                    'message' => 'Error al cambiar ownership del vehículo',
                    'status' => 500
                ];
                return response()->json($data, 500);
            }
            $vehicle->owner_id = $request->owner_id;
        }

        if ($request->has('price')) {
            $vehicle->price = $request->price;
        }

        $vehicle->save();

        $data = [
            'message' => 'Vehiculo actualizado',
            'owner' => $vehicle,
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
}
