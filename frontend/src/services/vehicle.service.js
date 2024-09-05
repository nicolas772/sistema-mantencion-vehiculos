import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + 'vehicles'

const createVehicle = (newVehicle) => {
  return axios.post(API_URL, newVehicle)
}

const getAllVehicles = () => {
  return axios.get(API_URL)
}

const getVehicleByID = (id) => {
  return axios.get(API_URL + `/${id}`)
}

const updateVehicleByID = ({id, newVehicleData}) => {
  return axios.put(API_URL + `/${id}`, newVehicleData)
}

const getHistoricOwnership = (id) => {
  return axios.put(API_URL + `/historic/${id}`)
}

const VehicleService = {
  createVehicle,
  getAllVehicles,
  getVehicleByID,
  updateVehicleByID,
  getHistoricOwnership
}

export default VehicleService