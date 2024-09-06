/* eslint-disable react/prop-types */
import { useState } from "react";
import { FileInput, Label, Button, Spinner } from "flowbite-react";
import UploadService from "../services/upload.service";

export default function Dropzone({ handleStatus, setResponseDetail}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileName", selectedFile.name);
  
      UploadService.uploadExcel(formData)
        .then((response) => {
          setLoading(false);
          setResponseDetail(response.data);
          if (response.data.errors.length > 0) {
            handleStatus("warning");
          } else {
            handleStatus("success");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          handleStatus("error");
        });
    }
  };
  

  return (
    <div className="w-3/5">
      {selectedFile ? (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <p className="text-gray-700 dark:text-gray-300">
            {selectedFile.name}
          </p>
          <Button color="gray" onClick={handleRemoveFile}>
            Eliminar
          </Button>
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click para subir</span> o arrastra el archivo
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Archivo Excel (con extensión .xlsx)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange}
            accept=".xlsx"
          />
        </Label>
      )}
      <div className="flex gap-2 my-2 justify-end">
        {
          loading
          ? (<Spinner></Spinner>)
          : (
            <>
              <Button color="gray" onClick={handleRemoveFile} disabled={!selectedFile}>
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Subir
              </Button>
            </>
          )
        }
        
      </div>
    </div>
  );
}
