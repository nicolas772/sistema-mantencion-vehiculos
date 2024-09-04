import { useState } from "react";
import Dropzone from "./Dropzone";
import PostUpload from "./PostUpload";

export default function Home() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // 'success' or 'error'
  
  const handleStatus = (estado) => {
    setStatus(estado)
  }

  const handleMessage = (mensaje) => {
    setMessage(mensaje)
  }
  
  return (
    <div className="mx-5 flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-cyan-900">Bienvenido al Sistema de Mantención de Vehículos 🚙</h1>
      {
        status 
        ? (<PostUpload message={message} status={status}/>) 
        : (
          <>
            <p className="text-lg text-gray-700 mb-8">
            Aquí puedes cargar un archivo <strong>.xlsx</strong> para la carga masiva de vehículos y clientes.
            </p>
            <Dropzone handleMessage={handleMessage} handleStatus={handleStatus}/>
          </>
        )
      }
    </div>
  );
}
