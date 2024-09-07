# Laravel + React Application

Este es un proyecto basado en el framework Laravel como Backend y React para Frontend. Aquí encontrarás los pasos para configurarlo y ejecutarlo desde cero.

## Requisitos previos

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- [PHP 8.x](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org/) y [NPM](https://www.npmjs.com/)

## Instrucciones de configuración

### 1. Clonar el repositorio

Primero, clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/nicolas772/sistema-mantencion-vehiculos.git
cd sistema-mantencion-vehiculos
```

### 2. Configuracion de Backend

Accede a la carpeta de backend con el siguiente comando:

```bash
cd backend
```

Luego instala las dependencias de PHP con Composer:

```bash
composer install
```

Instala además las dependencias de Node.js:

```bash
npm install
```

Luego, migra la base de datos con:

```bash
php artisan migrate
```

Por último, inicia el servidor de desarrollo con el comando:

```bash
php artisan serve
```

### 3. Configuración de Frontend

En otra ventana de terminal, ya ubicado en el directorio de este repositorio, accede a la carpeta de frontend

```bash
cd frontend
```
Luego, instala las dependencias de Node con el comando:

```bash
npm install
```

Por último, levanta el servidor del frontend con el comando:

```bash
npm run dev
```

Esto generará un servidor http://localhost:5173/, al cual podrás acceder desde tu navegador y poder interactuar con la aplicación.
