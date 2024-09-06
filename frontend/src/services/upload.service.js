import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + 'upload'

const uploadExcel = (formData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios.post(API_URL, formData, config)
}

const UploadService = {
  uploadExcel
}

export default UploadService