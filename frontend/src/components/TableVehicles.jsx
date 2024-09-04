import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import { useNavigate } from 'react-router-dom';
import cars from '../mockups/cars.json';

export default function TableVehicles () {
  const navigate = useNavigate();
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
        accessorKey: 'owner',
        header: 'Propietario',
      },
      {
        accessorKey: 'price',
        header: 'Precio',
        Cell: ({ cell }) => `$${cell.getValue()}`
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: cars,
    localization: MRT_Localization_ES,
    mantineTableContainerProps: { sx: { maxHeight: '350px' } },
    enableStickyHeader: true,
    initialState: { density: 'xs' },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/vehicles/${row.original.id}`), // Redirigir a una URL específica basada en el ID
      sx: { cursor: 'pointer' }, // Cambiar el cursor para indicar que la fila es clicable
    }),
  });

  return <MantineReactTable table={table}/>;
};