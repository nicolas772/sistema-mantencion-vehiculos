import TableMaterial from "./TableMaterial";

export default function Vehicles() {
  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">Vehículos 🚙</h1>
      <p className="text-sm text-gray-600 mb-8">
        Aquí puedes ver una lista de todos los vehículos registrados en el sistema.
      </p>
      <TableMaterial></TableMaterial>
    </div>
  );
}
