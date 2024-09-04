import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import historic from '../mockups/historic.json'

export default function HistoricTableOwners () {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'n_owner',
        header: 'N° Propietario',
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
      },
      {
        accessorKey: 'last_name',
        header: 'Apellido',
      },
      {
        accessorKey: 'email',
        header: 'Correo Electrónico',
      },
      {
        accessorKey: 'date',
        header: 'Fecha de Traspaso',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString('es-ES')
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

  return <MantineReactTable table={table}/>;
};
