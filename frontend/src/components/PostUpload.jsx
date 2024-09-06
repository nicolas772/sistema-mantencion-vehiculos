/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";

export default function PostUpload({ status, responseDetail }) {
  // Función para formatear los errores en una lista
  const formatErrors = (errors) => {
    return errors.map((error, index) => (
      <div key={index} className="mb-2">
        <p className="font-semibold">Fila {error.row}:</p>
        <ul className="list-disc pl-5">
          {error.errors.map((err, i) => (
            <li key={i} className="text-red-500">{err}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="m-4">
      {status === "success" && (
        <div>
          <p className="text-green-700 mb-4">Proceso completado con éxito.</p>
          <p className="text-gray-700 mb-2">Propietarios creados: {responseDetail.owners_created}</p>
          <p className="text-gray-700 mb-4">Vehículos creados: {responseDetail.vehicles_created}</p>
        </div>
      )}
      {status === "warning" && (
        <div>
          <p className="text-yellow-700 mb-4">El archivo fue cargado con algunos errores:</p>
          <p className="text-gray-700 mb-2">Propietarios creados: {responseDetail.owners_created}</p>
          <p className="text-gray-700 mb-4">Vehículos creados: {responseDetail.vehicles_created}</p>
          <div className="max-h-60 overflow-y-auto border border-yellow-300 p-2 bg-yellow-50 rounded">
            {formatErrors(responseDetail.errors)}
          </div>
        </div>
      )}
      {status === "error" && (
        <div>
          <p className="text-red-700 mb-4">Hubo un error al procesar el archivo.</p>
          <div className="max-h-60 overflow-y-auto border border-red-300 p-2 bg-red-50 rounded">
            {formatErrors(responseDetail.errors)}
          </div>
        </div>
      )}
      <Button onClick={() => window.location.reload()} className="my-4">
        {status === "success" ? "Subir otro archivo" : "Volver a intentar"}
      </Button>
    </div>
  );
}
