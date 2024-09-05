/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput, Spinner, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import VehicleService from "../services/vehicle.service";
import OwnerService from "../services/owner.service";

export default function ModalCreateVehicle({ openModal, setOpenModal, setReload }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    license_plate: '',
    year: '',
    price: '',
    owner_id: ''
  });

  const [errors, setErrors] = useState({
    brand: '',
    model: '',
    license_plate: '',
    year: '',
    price: '',
    owner_id: ''
  });

  const [owners, setOwners] = useState([])

  const [createError, setCreateError] = useState('');

  useEffect(() => {
    OwnerService.getAllOwners()
      .then((response) => {
        setOwners(response.data);
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setLoading(false)
      });
  }, []);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === "owner_id") {
      value = parseInt(value, 10);
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onCloseModal() {
    setCreateError('');
    setFormData({
      brand: '',
      model: '',
      license_plate: '',
      year: '',
      price: '',
      owner_id: ''
    });
    setErrors({
      brand: '',
      model: '',
      license_plate: '',
      year: '',
      price: '',
      owner_id: ''
    });
    setOpenModal(false);
  }

  const validateForm = () => {
    const newErrors = {
      brand: '',
      model: '',
      license_plate: '',
      year: '',
      price: '',
      owner_id: ''
    };

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido';
    }

    if (!formData.license_plate.trim()) {
      newErrors.license_plate = 'La patente es requerida';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'El año es requerido';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'El año debe tener 4 dígitos';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número positivo';
    }

    if (!formData.owner_id || isNaN(formData.owner_id)) {
      newErrors.owner_id = 'El propietario es requerido';
    }

    setErrors(newErrors);

    return !newErrors.brand && 
           !newErrors.model && 
           !newErrors.license_plate && 
           !newErrors.year && 
           !newErrors.price && 
           !newErrors.owner_id;
  };

  const handleCreateVehicle = () => {
    if (validateForm()) {
      setLoading(true);
      VehicleService.createVehicle(formData)
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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nuevo Vehículo</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="owner_id" value="Propietario" />
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="brand" value="Marca" />
              </div>
              <TextInput
                id="brand"
                name="brand"
                placeholder="Toyota"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="model" value="Modelo" />
              </div>
              <TextInput
                id="model"
                name="model"
                placeholder="Corolla"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="license_plate" value="Patente" />
              </div>
              <TextInput
                id="license_plate"
                name="license_plate"
                placeholder="AB123CD"
                value={formData.license_plate}
                onChange={handleInputChange}
                required
              />
              {errors.license_plate && <p className="text-red-500 text-sm">{errors.license_plate}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="year" value="Año" />
              </div>
              <TextInput
                id="year"
                name="year"
                type="number"
                placeholder="2022"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Precio" />
              </div>
              <TextInput
                id="price"
                name="price"
                type="number"
                placeholder="20000"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <div className="w-full">
              {loading 
                ? (<Spinner />) 
                : (<Button onClick={handleCreateVehicle}>Guardar</Button>)
              }
            </div>
            {createError && <p className="text-red-500 text-sm">{createError}</p>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
