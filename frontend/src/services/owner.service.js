import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + 'owners'

const createOwner = (newOwner) => {
  return axios.post(API_URL, newOwner)
}

const OwnerService = {
  createOwner
}

export default OwnerService