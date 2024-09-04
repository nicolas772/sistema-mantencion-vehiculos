import TableVehicles from "./TableVehicles";

export default function Vehicles() {
  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">Vehículos 🚙</h1>
      <p className="text-sm text-gray-600 mb-8">
        Puedes hacer click en cada fila para ingresar al detalle del vehículo.
      </p>
      <TableVehicles />
    </div>
  );
}
