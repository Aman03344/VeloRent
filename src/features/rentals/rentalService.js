import axios from "axios";

//  get rentals for admin
const fetchRentalsFormAdmin = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/admin/rentals`, options);
  return response.data;
};

// get all rentals for user

const fetchRentalsForUser = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/rentals`, options);
  return response.data;
};

// Get single rental
const fetchSingleRental = async (id, token) => {
  const options = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/rentals/${id}`, options);
  console.log(response.data);
  return response.data;
};

const createRental = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("https://car-rental-app-5d25.onrender.com/api/rentals/" + formData.id,formData,options);
  return response.data;
};

const rentalService = {
  fetchRentalsFormAdmin,
  fetchRentalsForUser,
  fetchSingleRental,
  createRental,
};

export default rentalService;
