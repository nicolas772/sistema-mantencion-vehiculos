import { Tabs } from "flowbite-react";
import { HiInformationCircle, HiClipboardList } from "react-icons/hi";

export default function VehicleDetail () {
  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">Vehículos 🚙</h1>
      <p className="text-sm text-gray-600 mb-8">
        Puedes hacer click en cada fila para ingresar al detalle del vehículo.
      </p>
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="Información" icon={HiInformationCircle}>
          Formulario con info para editar
        </Tabs.Item>
        <Tabs.Item title="Histórico" icon={HiClipboardList}>
          Tabla de historico
        </Tabs.Item>
      </Tabs>
    </div>
  )
}