import { Table } from "flowbite-react";
import cars from '../mockups/cars2.json';

export default function TableFB () {
  return (
    <div className="overflow-y-auto max-h-96 rounded-md shadow-md">
        <Table hoverable>
          <Table.Head className="sticky top-0">
            <Table.HeadCell>Marca</Table.HeadCell>
            <Table.HeadCell>Modelo</Table.HeadCell>
            <Table.HeadCell>Patente</Table.HeadCell>
            <Table.HeadCell>Año</Table.HeadCell>
            <Table.HeadCell>Dueño</Table.HeadCell>
            <Table.HeadCell>Precio</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              cars.map((car) => (
                <Table.Row key={car.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {car.brand}
                  </Table.Cell>
                  <Table.Cell>{car.model}</Table.Cell>
                  <Table.Cell>{car.license_plate}</Table.Cell>
                  <Table.Cell>{car.year}</Table.Cell>
                  <Table.Cell>{car.owner}</Table.Cell>
                  <Table.Cell>${car.price}</Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Editar
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
  )
}