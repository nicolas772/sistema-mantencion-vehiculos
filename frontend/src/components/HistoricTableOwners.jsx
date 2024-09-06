/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Spinner } from 'flowbite-react';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import VehicleService from '../services/vehicle.service';

export default function HistoricTableOwners ({id}) {
  const [historic, setHistoric] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    VehicleService.getHistoricOwnership(id)
      .then((response) => {
        setHistoric(response.data.data);
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
        accessorKey: 'n_owner',
        header: 'N° Propietario',
      },
      {
        accessorKey: 'owner.name',
        header: 'Nombre',
      },
      {
        accessorKey: 'owner.last_name',
        header: 'Apellido',
      },
      {
        accessorKey: 'owner.email',
        header: 'Correo Electrónico',
      },
      {
        accessorKey: 'date',
        header: 'Fecha de Traspaso',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString('es-ES')
      },
      {
        accessorKey: 'date',
        header: 'Hora de Traspaso',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleTimeString('es-ES')
      }
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: historic,
    localization: MRT_Localization_ES,
    mantineTableContainerProps: { sx: { maxHeight: '250px' } },
    enableStickyHeader: true,
    initialState: { density: 'xs' },
  });

  return (
    <>
      {
        loading
        ? (<Spinner className='m-8'/>)
        : (<MantineReactTable table={table}/>)
      }
    </>
  )
};
