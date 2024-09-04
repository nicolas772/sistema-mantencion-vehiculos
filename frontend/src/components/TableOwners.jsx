import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import { useNavigate } from 'react-router-dom';
import OwnerService from '../services/owner.service';
import { Spinner } from 'flowbite-react';

export default function TableOwners() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    OwnerService.getAllOwners()
      .then((response) => {
        setOwners(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setLoading(false)
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 50,
      },
      {
        accessorKey: 'last_name',
        header: 'Apellido',
        size: 50,
      },
      {
        accessorKey: 'email',
        header: 'Correo Electrónico',
        size: 50,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: owners,
    localization: MRT_Localization_ES,
    mantineTableContainerProps: { sx: { maxHeight: '300px' } },
    enableStickyHeader: true,
    initialState: { density: 'xs' },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/owners/${row.original.id}`), // Redirigir a una URL específica basada en el ID
      sx: { cursor: 'pointer' }, // Cambiar el cursor para indicar que la fila es clicable
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
  )
};
