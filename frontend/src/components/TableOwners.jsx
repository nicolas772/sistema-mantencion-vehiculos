import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import { useNavigate } from 'react-router-dom';
import owners from '../mockups/owners.json'

export default function TableOwners () {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 50, //small column
      },
      {
        accessorKey: 'last_name',
        header: 'Apellido',
        size: 50, //small column
      },
      {
        accessorKey: 'email',
        header: 'Correo Electrónico',
        size: 50, //small column
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: owners,
    localization: MRT_Localization_ES,
    mantineTableContainerProps: { sx: { maxHeight: '350px' } },
    enableStickyHeader: true,
    initialState: { density: 'xs' },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/owners/${row.original.id}`), // Redirigir a una URL específica basada en el ID
      sx: { cursor: 'pointer' }, // Cambiar el cursor para indicar que la fila es clicable
    }),
  });

  return <MantineReactTable table={table}/>;
};