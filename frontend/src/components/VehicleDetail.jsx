import { Tabs, Button, TextInput, Label, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiInformationCircle, HiClipboardList } from "react-icons/hi";
import HistoricTableOwners from "./HistoricTableOwners";
import { useNavigate, useParams } from "react-router-dom";
import VehicleService from '../services/vehicle.service';
import ModalChangeOwner from "./ModalChangeOwner";

export default function VehicleDetail() {
  const {id} = useParams();
  const [vehicle, setVehicle] = useState({});
  const [originalVehicle, setOriginalVehicle] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [errorEdit, setErrorEdit] = useState('');

  useEffect(() => {
    VehicleService.getVehicleByID(id)
      .then((response) => {
        setVehicle(response.data.vehicle);
        setOriginalVehicle(response.data.vehicle);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    if (isEditing) {
      setLoading2(true);
      VehicleService.updateVehicleByID({ id, newVehicleData: vehicle })
      .then((response) => {
        setVehicle(response.data.vehicle);
        setOriginalVehicle(response.data.vehicle);
        setLoading2(false);
        setIsEditing(false);
        setErrorEdit('');
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setErrorEdit('Error al editar. Verifica que tus datos estén correctos.');
        setVehicle(originalVehicle);
        setLoading2(false);
        setIsEditing(false);
      });
    } else {
      setIsEditing(true);
      setErrorEdit('');
    }
  };

  const handleCancelClick = () => {
    setVehicle(originalVehicle);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle(prevState => ({
      ...prevState,
      [name]: name === 'owner' ? Number(value) : value
    }));
  };

  const handleComeBack = () => {
    navigate('/vehicles');
  };

  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false)

  const handleChangeOwner = () => {
    setOpenModal(true)
  }
  
  useEffect(() => {
    if (reload) {
      window.location.reload()
    }
    setReload(false)
  }, [reload])

  if (loading) {
    return <Spinner className="m-10"/>;
  }

  return (
    <div className="m-10 flex flex-col bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2 text-cyan-900">
        {originalVehicle.brand} {originalVehicle.model}
      </h1>
      <p className="text-sm text-gray-600">
        Puedes ver y editar la información del vehículo. Además, puedes ver el histórico de dueños.
      </p>
      <div className="flex gap-2 my-6">
        <Button onClick={handleComeBack}>Volver a Vehiculos</Button>
        <Button onClick={handleEditClick} disabled={isEditing}>Editar</Button>
        <Button onClick={handleChangeOwner} disabled={isEditing}>Cambiar Propietario</Button>
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
                  <TextInput id="brand" type="text" sizing="sm" name="brand" value={vehicle.brand} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="model" value="Modelo" />
                  </div>
                  <TextInput id="model" type="text" sizing="sm" name="model" value={vehicle.model} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="license_plate" value="Patente" />
                  </div>
                  <TextInput id="license_plate" type="text" sizing="sm" name="license_plate" value={vehicle.license_plate} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
              </div>

              <div className="flex w-1/2 flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="year" value="Año" />
                  </div>
                  <TextInput id="year" type="number" sizing="sm" name="year" value={vehicle.year} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="owner" value="Propietario" />
                  </div>
                  <TextInput id="owner" type="text" sizing="sm" name="owner" value={vehicle.owner.name + ' ' + vehicle.owner.last_name } disabled/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price" value="Precio" />
                  </div>
                  <TextInput id="price" type="number" sizing="sm" name="price" value={vehicle.price} onChange={handleInputChange} disabled={!isEditing}/>
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
        <Tabs.Item title="Histórico Propietarios" icon={HiClipboardList}>
          <HistoricTableOwners />
        </Tabs.Item>
      </Tabs>
      <ModalChangeOwner openModal={openModal} setOpenModal={setOpenModal} setReload={setReload} vehicle_id={id} owner_id={vehicle.owner_id}  />
    </div>
  );
}
