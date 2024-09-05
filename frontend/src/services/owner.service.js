import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + 'owners'

const createOwner = (newOwner) => {
  return axios.post(API_URL, newOwner)
}

const getAllOwners = () => {
  return axios.get(API_URL)
}

const getOwnerByID = (id) => {
  return axios.get(API_URL + `/${id}`)
}

const updateOwnerByID = ({id, newOwnerData}) => {
  return axios.put(API_URL + `/${id}`, newOwnerData)
}

const OwnerService = {
  createOwner,
  getAllOwners,
  getOwnerByID,
  updateOwnerByID
}

export default OwnerService