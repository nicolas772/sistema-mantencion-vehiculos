import { Button } from "flowbite-react";
 
 // eslint-disable-next-line react/prop-types
 export default function PostUpload ({message, status}) {
  return (
    <>
      <p className="text-lg text-gray-700 mb-4">
        {message}
      </p>
      {
        (status === "success")
        ? (
          <Button onClick={() => window.location.reload()}>Subir otro archivo</Button>
        )
        : (
          <Button onClick={() => window.location.reload()}>Volver a intentar</Button>
        )
      }
    </>
  )
}