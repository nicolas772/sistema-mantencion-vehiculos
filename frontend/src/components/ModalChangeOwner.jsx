/* eslint-disable react/prop-types */
import { Button, Label, Modal, Spinner, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import VehicleService from "../services/vehicle.service";
import OwnerService from "../services/owner.service";

export default function ModalChangeOwner({ openModal, setOpenModal, setReload, vehicle_id, owner_id }) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [formData, setFormData] = useState({owner_id});
  const [errors, setErrors] = useState({owner_id: ''});
  const [owners, setOwners] = useState([])
  const [createError, setCreateError] = useState('');
  const [sameOwner, setSameOwner] = useState(true)

  useEffect(() => {
    OwnerService.getAllOwners()
      .then((response) => {
        setOwners(response.data);
        setLoading2(false)
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setLoading2(false)
      });
  }, []);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value, 10);
    setSameOwner(value === owner_id)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onCloseModal() {
    setCreateError('');
    setFormData({ owner_id: ''});
    setErrors({owner_id: ''});
    setOpenModal(false);
  }

  const validateForm = () => {
    const newErrors = {owner_id: ''};
    if (!formData.owner_id || isNaN(formData.owner_id)) {
      newErrors.owner_id = 'El propietario es requerido';
    }
    setErrors(newErrors);
    return !newErrors.owner_id;
  };

  const handleCreateVehicle = () => {
    if (validateForm()) {
      setLoading(true);
      VehicleService.updateVehicleByID({id: vehicle_id, newVehicleData: formData})
        .then(() => {
          setLoading(false);
          setReload(true);
          onCloseModal();
        })
        .catch((error) => {
          setCreateError(error.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          {
            loading2
            ? (<Spinner></Spinner>)
            : (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Cambiar Propietario</h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="owner_id" value="Nuevo Propietario" />
                  </div>
                  <Select
                    id="owner_id"
                    name="owner_id"
                    value={formData.owner_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un propietario</option>
                    {owners.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {`${owner.name} ${owner.last_name}`}
                      </option>
                    ))}
                  </Select>
                  {errors.owner_id && <p className="text-red-500 text-sm">{errors.owner_id}</p>}
                </div>
                <div className="w-full">
                  {loading 
                    ? (<Spinner />) 
                    : (<Button onClick={handleCreateVehicle} disabled={sameOwner}>Guardar</Button>)
                  }
                </div>
                {createError && <p className="text-red-500 text-sm">{createError}</p>}
              </div>
            )
          }
          
        </Modal.Body>
      </Modal>
    </>
  );
}
