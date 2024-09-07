<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use App\Models\Vehicle;
use App\Models\VehicleOwnershipHistory;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\ToArray;
use Illuminate\Support\Facades\Validator;
use App\Mail\ImportNotificationMail;
use Illuminate\Support\Facades\Mail;

class UploadController extends Controller
{
    
    public function import(Request $request)
    {
        // Validar que el archivo sea un Excel
        $request->validate([
            'file' => 'required|mimes:xlsx,csv|max:2048',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $errors = []; // Array para almacenar los errores
            $ownersCreated = 0;
            $vehiclesCreated = 0;
            $ownersRestaured = 0;
            $vehiclesRestaured = 0;

            // Leer el archivo Excel
            $import = new class implements ToArray {
                public function array(array $array)
                {
                    return $array;
                }
            };

            $data = Excel::toArray($import, $file)[0]; // Obtener los datos del archivo Excel
            unset($data[0]); // Eliminar la primera fila (encabezados)

            foreach ($data as $index => $row) {
                $name = $row[0];
                $last_name = $row[1];
                $email = $row[2];
                $brand = $row[3];
                $model = $row[4];
                $license_plate = $row[5];
                $year = $row[6];
                $price = $row[7];

                // Validar los datos del propietario
                $ownerValidator = Validator::make([
                    'name' => $name,
                    'last_name' => $last_name,
                    'email' => $email,
                ], [
                    'name' => 'required|max:255|regex:/^[\p{L}\s]+$/u',
                    'last_name' => 'required|max:255|regex:/^[\p{L}\s]+$/u',
                    'email' => 'required|email|max:255',
                ]);

                // Si hay errores en la validación del propietario
                if ($ownerValidator->fails()) {
                    $errors[] = [
                        'row' => $index, // Para reflejar la fila real en Excel
                        'errors' => $ownerValidator->errors()->all()
                    ];
                    continue; // Saltar a la siguiente fila si falla
                }

                // Buscar si el propietario ya existe por el correo
                $owner = Owner::withTrashed()->where('email', $email)->first();

                if ($owner) {
                    // Restaurar el propietario si está eliminado
                    if ($owner->trashed()) {
                        $owner->restore();
                        // Actualizar el propietario con los nuevos datos
                        $owner->update([
                            'name' => $name,
                            'last_name' => $last_name,
                        ]);
                        $ownersRestaured++;
                    } else {
                        $errors[] = [
                            'row' => $index,
                            'errors' => ['El email ' . $email . ' ya existe.']
                        ];
                    }
                } else {
                    // Crear el propietario si no existe
                    $owner = Owner::create([
                        'name' => $name,
                        'last_name' => $last_name,
                        'email' => $email,
                    ]);
                    $ownersCreated++;
                }

                // Validar los datos del vehículo
                $vehicleValidator = Validator::make([
                    'brand' => $brand,
                    'model' => $model,
                    'license_plate' => $license_plate,
                    'year' => $year,
                    'price' => $price,
                ], [
                    'brand' => 'required|max:255',
                    'model' => 'required|max:255',
                    'license_plate' => 'required|max:255',
                    'year' => 'required|integer|between:1900,2030',
                    'price' => 'required|numeric',
                ]);

                // Si hay errores en la validación del vehículo
                if ($vehicleValidator->fails()) {
                    $errors[] = [
                        'row' => $index,
                        'errors' => $vehicleValidator->errors()->all()
                    ];
                    continue; // Saltar a la siguiente fila si falla
                }

                // Verificar si el vehículo ya está registrado por la patente
                $vehicle = Vehicle::withTrashed()->where('license_plate', $license_plate)->first();

                if ($vehicle) {
                    // Restaurar el vehículo si está eliminado
                    if ($vehicle->trashed()) {
                        $vehicle->restore();
                        // Actualizar el vehículo con los nuevos datos
                        $vehicle->update([
                            'brand' => $brand,
                            'model' => $model,
                            'year' => $year,
                            'price' => $price,
                            'owner_id' => $owner->id,
                        ]);
                        VehicleOwnershipHistory::create([
                            'vehicle_id' => $vehicle->id,
                            'owner_id' => $owner->id,
                        ]);
                        $vehiclesRestaured++;
                    } else {
                        $errors[] = [
                            'row' => $index,
                            'errors' => ['El vehículo con patente ' . $license_plate . ' ya existe.']
                        ];
                    }
                } else {
                    // Crear el vehículo si no existe
                    $vehicle = Vehicle::create([
                        'brand' => $brand,
                        'model' => $model,
                        'license_plate' => $license_plate,
                        'year' => $year,
                        'price' => $price,
                        'owner_id' => $owner->id,
                    ]);
                    $vehiclesCreated++;

                    // Crear el registro en VehicleOwnershipHistory
                    VehicleOwnershipHistory::create([
                        'vehicle_id' => $vehicle->id,
                        'owner_id' => $owner->id,
                    ]);
                }
            }

            Mail::to('support@rebits.cl')->send(new ImportNotificationMail($file->getClientOriginalName(), $ownersCreated, $vehiclesCreated, $errors));

            // Retornar respuesta con errores si existen
            return response()->json([
                'message' => 'Proceso completado',
                'errors' => $errors,
                'owners_created' => $ownersCreated,
                'vehicles_created' => $vehiclesCreated,
                'owners_restaured' => $ownersRestaured,
                'vehicles_restaured' => $ownersRestaured
            ]);
        }

        return response()->json(['message' => 'No se recibió ningún archivo.'], 400);
    }
}
