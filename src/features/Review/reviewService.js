import axios from "axios";
// for admin
const fetchReviewsFromAdmin = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/admin/reviews`, options);
  return response.data;
};




const fetchReview = async(id , token)=>{
  const options ={
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.get(`https://car-rental-app-5d25.onrender.com/api/car/${id}/reviews` ,options)
  return response.data
}


const createReview = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`https://car-rental-app-5d25.onrender.com/api/car/${formData.id}/reviews/add`,formData,options);
  return response.data;
};

const reviewService = {
  fetchReviewsFromAdmin,
  fetchReview,
  createReview
};

export default reviewService;
