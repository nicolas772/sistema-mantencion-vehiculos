import Dropzone from "./Dropzone";

export default function Home() {
  return (
    <div className="mx-5 flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <h1 className="text-3xl font-semibold mb-8">Bienvenido al Sistema de Mantención de Vehículos 🚙</h1>
      <p className="text-lg text-gray-700 mb-8">
        Aquí puedes cargar un archivo <strong>.xlsx</strong> para la carga masiva de vehículos y clientes.
      </p>
      <Dropzone/>
    </div>
  );
}
