<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OwnerController extends Controller
{
    public function index()
    {
        $owners = Owner::all();
        if ($owners->isEmpty()) {
            return response()->json(['message' => 'No hay owners registrados'], 404);
        }
        return response()->json($owners, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $owner = Owner::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email
        ]);

        if (!$owner) {
            $data = [
                'message' => 'Error al crear el owner',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'owner' => $owner,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $owner = Owner::find($id);

        if (!$owner) {
            $data = [
                'messsage' => 'owner no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $data = [
            'owner' => $owner,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $owner = Owner::find($id);

        if (!$owner) {
            $data = [
                'message' => 'owner no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'max:255',
            'last_name' => 'max:255',
            'email' => 'email',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('name')) {
            $owner->name = $request->name;
        }

        if ($request->has('last_name')) {
            $owner->last_name = $request->last_name;
        }

        if ($request->has('email')) {
            $owner->email = $request->email;
        }

        $owner->save();

        $data = [
            'message' => 'Owner actualizado',
            'owner' => $owner,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function delete($id)
    {
        $owner = Owner::find($id);

        if (!$owner) {
            $data = [
                'message' => 'Owner no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $owner->delete();

        $data = [
            'message' => 'Owner eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
