import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import { useNavigate } from 'react-router-dom';
import VehicleService from '../services/vehicle.service';
import { Spinner } from 'flowbite-react';

export default function TableVehicles () {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    VehicleService.getAllVehicles()
      .then((response) => {
        const vehiclesWithOwnerFullName = response.data.map((vehicle) => ({
          ...vehicle,
          ownerFullName: vehicle.owner ? `${vehicle.owner.name} ${vehicle.owner.last_name}` : 'Sin propietario'
        }));
        setVehicles(vehiclesWithOwnerFullName);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      });
  }, []);
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'brand',
        header: 'Marca',
      },
      {
        accessorKey: 'model',
        header: 'Modelo',
      },
      {
        accessorKey: 'license_plate',
        header: 'Patente',
      },
      {
        accessorKey: 'year',
        header: 'Año',
      },
      {
        accessorKey: 'ownerFullName',  // Usamos este campo para filtros y búsqueda
        header: 'Propietario',
        Cell: ({ cell }) => cell.getValue(), // Mostramos el valor directamente desde ownerFullName
      },
      {
        accessorKey: 'price',
        header: 'Precio',
        Cell: ({ cell }) => `$${cell.getValue()}`,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: vehicles,
    localization: MRT_Localization_ES,
    mantineTableContainerProps: { sx: { maxHeight: '300px' } },
    enableStickyHeader: true,
    initialState: { density: 'xs' },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/vehicles/${row.original.id}`),
      sx: { cursor: 'pointer' },
    }),
  });

  return (
    <>
      {
        loading
        ? (<Spinner className='m-8'/>)
        : (<MantineReactTable table={table}/>)
      }
    </>
  );
}
