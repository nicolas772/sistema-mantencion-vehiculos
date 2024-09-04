import { Tabs } from "flowbite-react";
import { HiInformationCircle, HiClipboardList } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useState } from "react";

const data = {
  "id": 1,
  "name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}

export default function VehicleDetail () {
  const [owner] = useState(data)

  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">{owner.name} {owner.last_name}</h1>
      <p className="text-sm text-gray-600">
        Puedes ver y editar la información, además de ver el histórico de vehículos.
      </p>
      <div className="flex gap-2 my-6">
        <Button>Volver a Propietarios</Button>
        <Button>Editar</Button>
        <Button color="failure">Eliminar</Button>
      </div>
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