import { Tabs, Button, TextInput, Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialData = {
  "id": 1,
  "name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}

export default function VehicleDetail () {
  const [owner, setOwner] = useState(initialData);
  const [originalOwner, setOriginalOwner] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  const handleEditClick = () => {
    setOriginalOwner(owner);
    if (isEditing) {
      // Save changes logic here
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    setOwner(originalOwner); // Restore the original values
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  const handleComeBack = () => {
    navigate('/owners')
  }

  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">{originalOwner.name} {originalOwner.last_name}</h1>
      <p className="text-sm text-gray-600">
        Puedes ver y editar la información del propietario.
      </p>
      <div className="flex gap-2 my-6">
        <Button onClick={handleComeBack}>Volver a Propietarios</Button>
        <Button onClick={handleEditClick} disabled={isEditing}>Editar</Button>
        <Button color="failure">Eliminar</Button>
      </div>
      <Tabs aria-label="Default tabs" variant="default">
      <Tabs.Item active title="Información" icon={HiInformationCircle}>
          <div className="max-w-md">
            <div className="flex gap-8">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Nombre" />
                  </div>
                  <TextInput id="name" type="text" sizing="sm" name="name" value={owner.name} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="last_name" value="Apellido" />
                  </div>
                  <TextInput id="last_name" type="text" sizing="sm" name="last_name" value={owner.last_name} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput id="email" type="email" sizing="sm" name="email" value={owner.email} onChange={handleInputChange} disabled={!isEditing}/>
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
        
      </Tabs>
    </div>
  )
}