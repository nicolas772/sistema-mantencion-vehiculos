import TableOwners from "./TableOwners";
import { Button } from "flowbite-react";

export default function Owners() {
  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">Propietarios 👤</h1>
      <p className="text-sm text-gray-600 mb-8">
        Puedes hacer click en cada fila para ingresar al detalle de cada propietario.
      </p>
      <div className="w-3/4">
        <TableOwners />
      </div>
      <div className="flex justify-start my-2">
        <Button>Crear Propietario</Button>
      </div>
    </div>
  );
}
