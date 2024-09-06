import TableVehicles from "./TableVehicles";
import { Button } from "flowbite-react";
import ModalCreateVehicle from "./ModaLCreateVehicle";
import { useState, useEffect } from "react";

export default function Vehicles() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false)

  const handleCreateVehicle = () => {
    setOpenModal(true)
  }
  
  useEffect(() => {
    if (reload) {
      window.location.reload()
    }
    setReload(false)
  }, [reload])
  
  return (
    <>
      <div className="m-10 flex flex-col bg-gray-100">
        <h1 className="text-2xl font-semibold mb-2 text-cyan-900">Vehículos 🚙</h1>
        <p className="text-sm text-gray-600 mb-8">
          Puedes hacer click en cada fila para ingresar al detalle del vehículo.
        </p>
        <div className="w-11/12">
          <TableVehicles />
        </div>
        <div className="flex justify-start my-2">
          <Button onClick={handleCreateVehicle}>Crear Vehículo</Button>
        </div>
      </div>
      <ModalCreateVehicle openModal={openModal} setOpenModal={setOpenModal} setReload={setReload} />
    </>
  );
}
