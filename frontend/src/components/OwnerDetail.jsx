/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, Button, TextInput, Label, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OwnerService from "../services/owner.service";

export default function VehicleDetail () {
  const {id} = useParams()
  const [owner, setOwner] = useState({});
  const [originalOwner, setOriginalOwner] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [errorEdit, setErrorEdit] = useState('')

  useEffect(() => {
    OwnerService.getOwnerByID(id)
      .then((response) => {
        setOwner(response.data.owner);
        setOriginalOwner(response.data.owner)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setLoading(false)
      });
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      setLoading2(true)
      OwnerService.updateOwnerByID({id, newOwnerData: owner})
      .then((response) => {
        setOwner(response.data.owner);
        setOriginalOwner(response.data.owner)
        setLoading2(false)
        setIsEditing(false);
        setErrorEdit('')
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setErrorEdit('Error al editar. Verifica que tus datos estén correctos.')
        setOwner(originalOwner);
        setLoading2(false)
        setIsEditing(false);
      });
    } else {
      setIsEditing(true);
      setErrorEdit('')
    }
  };

  const handleCancelClick = () => {
    setOwner(originalOwner);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  const handleComeBack = () => {
    navigate('/owners')
  }

  const handleDelete = () => {
    setLoading(true)
    OwnerService.deleteOwnerByID(id)
      .then(() => {
        navigate('/owners')
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        alert('Error al eliminar Propietario, intente nuevamente')
        setLoading(false)
      });
  }

  if (loading) {
    return <Spinner className="m-10"/>
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
        <Button onClick={handleDelete} color="failure">Eliminar</Button>
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
                {errorEdit && <p className="text-red-500 text-sm">{errorEdit}</p>}
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2 my-6 justify-end">
                {
                  loading2
                  ? (<Spinner />)
                  : (<>
                      <Button onClick={handleCancelClick} color="gray">Cancelar</Button>
                      <Button onClick={handleEditClick}>Guardar</Button>
                    </>
                  )
                }
              </div>
            )}
          </div>
          
        </Tabs.Item>
        
      </Tabs>
    </div>
  )
}