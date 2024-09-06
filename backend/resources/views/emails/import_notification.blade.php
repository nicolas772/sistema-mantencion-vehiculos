<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Carga</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            margin: 0 0 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }
        .error-list {
            background-color: #f8d7da;
            color: #721c24;
            padding: 10px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .error-list ul {
            list-style: none;
            padding-left: 0;
        }
        .error-list li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Notificación de Carga de Datos</h1>
        <p>Hola,</p>
        <p>Se ha cargado un archivo al sistema con éxito.</p>
        <p><strong>Nombre del archivo:</strong> {{ $fileName }}</p>
        <p><strong>Cantidad de propietarios creados:</strong> {{ $ownersCreated }}</p>
        <p><strong>Cantidad de vehículos creados:</strong> {{ $vehiclesCreated }}</p>

        <!-- Si hay errores, los mostramos -->
        @if (!empty($errors))
            <div class="error-list">
                <h2>Errores durante la carga:</h2>
                <ul>
                    @foreach ($errors as $error)
                        <li>
                            <strong>Fila {{ $error['row'] }}:</strong>
                            <ul>
                                @foreach ($error['errors'] as $errorMessage)
                                    <li>{{ $errorMessage }}</li>
                                @endforeach
                            </ul>
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif

        <p>Gracias por usar nuestro sistema.</p>
        <div class="footer">
            <p>Este es un mensaje automático, por favor no responda.</p>
        </div>
    </div>
</body>
</html>
