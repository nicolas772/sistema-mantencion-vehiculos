/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import OwnerService from "../services/owner.service";

export default function ModalCreateOwner({ openModal, setOpenModal }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    last_name: '',
    email: '',
  });

  const [createError, setCreateError] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onCloseModal() {
    setCreateError('')
    setFormData({
      name: '',
      last_name: '',
      email: '',
    });
    setErrors({
      name: '',
      last_name: '',
      email: '',
    });
    setOpenModal(false);
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      last_name: '',
      email: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo electrónico es inválido';
    }

    setErrors(newErrors);

    // Si no hay errores, el formulario es válido
    return !newErrors.name && !newErrors.last_name && !newErrors.email;
  };

  const handleCreateOwner = () => {
    if (validateForm()) {
      setLoading(true)
      OwnerService.createOwner(formData)
        .then(() => {
          setLoading(false)
          onCloseModal();
        })
        .catch((error) => {
          setCreateError(error.response.data.message)
          setLoading(false)
        });
    }
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nuevo propietario</h3>
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="John"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Apellido" />
              </div>
              <TextInput
                id="last_name"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo Electrónico" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              {createError && <p className="text-red-500 text-sm">{createError}</p>}
            </div>

            <div className="w-full">
              {loading 
              ? (<Spinner />) 
              : (<Button onClick={handleCreateOwner}>Guardar</Button>)
              }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
