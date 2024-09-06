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
        <p>Gracias por usar nuestro sistema.</p>
        <div class="footer">
            <p>Este es un mensaje automático, por favor no responda.</p>
        </div>
    </div>
</body>
</html>
