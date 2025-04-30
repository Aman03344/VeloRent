import axios from "axios";



// get all cars
const fetchCars = async () => {
  const response = await axios.get("https://car-rental-app-5d25.onrender.com/api/car");
  return response.data.cars;
};


// get single car
const fetchCar = async (id) => {
  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/car/${id}`);
  return response.data;
};


// create a new car 
const createCar = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post("https://car-rental-app-5d25.onrender.com/api/admin/car", formData, options);
  return response.data;
};

const deleteCar = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("https://car-rental-app-5d25.onrender.com/api/admin/car/" + id, options);
  return response.data;
};

const updateCar = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "https://car-rental-app-5d25.onrender.com/api/admin/car/" + formData._id,
    formData,
    options
  );
  return response.data;
};

const findCar = async (query) => {
  const response = await axios.get(
    `https://car-rental-app-5d25.onrender.com/api/car/search?query=${query}`
  );
  return response.data;
};


const searchCar = async (query) => {
  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/car/search?query=${query}`);
  return response.data;
};

const carService = {
  fetchCars,
  createCar,
  deleteCar,
  updateCar,
  fetchCar,
  findCar,
  searchCar
};

export default carService;
