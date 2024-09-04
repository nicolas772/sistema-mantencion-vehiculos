import { Tabs, Button, TextInput, Label, Select } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle, HiClipboardList } from "react-icons/hi";
import owners from '../mockups/owners.json'
import HistoricTableOwners from "./HistoricTableOwners";

const initialData = {
  id: 16,
  brand: "Volvo",
  model: "S60",
  license_plate: "QRS234",
  year: 2017,
  owner: 2,
  price: 29000,
};

export default function VehicleDetail() {
  const [car, setCar] = useState(initialData);
  const [originalCar, setOriginalCar] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    console.log(car)
    setOriginalCar(car);
    if (isEditing) {
      // Save changes logic here
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    setCar(originalCar); // Restore the original values
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'owner') {
      setCar({ ...car, [name]: Number(value) });
    } else {
      setCar({ ...car, [name]: value });
    }
  };


  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">
        {originalCar.brand} {originalCar.model}
      </h1>
      <p className="text-sm text-gray-600">
        Puedes ver y editar la información, además de ver el histórico de dueños.
      </p>
      <div className="flex gap-2 my-6">
        <Button>Volver a Vehiculos</Button>
        <Button onClick={handleEditClick} disabled={isEditing}>Editar</Button>
        <Button color="failure">Eliminar</Button>
      </div>
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="Información" icon={HiInformationCircle}>
          <div className="max-w-xl">
            <div className="flex gap-8">
              <div className="flex w-1/2 flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="brand" value="Marca" />
                  </div>
                  <TextInput id="brand" type="text" sizing="sm" name="brand" value={car.brand} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="model" value="Modelo" />
                  </div>
                  <TextInput id="model" type="text" sizing="sm" name="model" value={car.model} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="license_plate" value="Patente" />
                  </div>
                  <TextInput id="license_plate" type="text" sizing="sm" name="license_plate" value={car.license_plate} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                
              </div>

              <div className="flex w-1/2 flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="year" value="Año" />
                  </div>
                  <TextInput id="year" type="number" sizing="sm" name="year" value={car.year} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="owner" value="Propietario" />
                  </div>
                  <Select
                    id="owner"
                    name="owner"
                    value={car.owner}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    {owners.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {owner.name} {owner.last_name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price" value="Precio" />
                  </div>
                  <TextInput id="price" type="number" sizing="sm" name="price" value={car.price} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2 my-6 justify-end">
                <Button onClick={handleCancelClick} color="gray">Cancelar</Button>
                <Button onClick={handleEditClick}>Guardar</Button>
              </div>
            )}
          </div>
          
        </Tabs.Item>
        <Tabs.Item title="Histórico" icon={HiClipboardList}>
          <HistoricTableOwners></HistoricTableOwners>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
