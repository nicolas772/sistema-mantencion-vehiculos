import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import cars from '../mockups/cars2.json';

const TableMaterial = () => {
  //should be memoized or stable
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
  });

  return <MantineReactTable table={table}/>;
};

export default TableMaterial;