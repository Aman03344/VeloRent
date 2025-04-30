"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCar } from "../features/CAR/carSlice"
import { toast } from "react-toastify"
import Loading from "../components/Loading"
import { addRental } from "../features/rentals/rentalSlice"
import { addReview, getReviews } from "../features/Review/reviewSlice"


// Star Rating Component
const StarRating = ({ rating, setRating, editable = false }) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1

        return (
          <button
            type="button"
            key={index}
            className={`${editable ? "cursor-pointer" : "cursor-default"} focus:outline-none`}
            onClick={() => editable && setRating(ratingValue)}
            onMouseEnter={() => editable && setHover(ratingValue)}
            onMouseLeave={() => editable && setHover(0)}
          >
            <svg
              className={`w-6 h-6 ${ratingValue <= (hover || rating) ? "text-yellow-300 fill-yellow-300" : "text-gray-300 fill-gray-300"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

// Main Component
const CarDetailPage = () => {
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")


  const { car, isLoading, isError, message } = useSelector(state => state.car)
  const { reviews, isLoadingReview, isSuccessReview, isErrorReview, messageReview } = useSelector(state => state.review)


  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(getCar(id))
    dispatch(getReviews(id))
  }, [id])



  useEffect(() => {
    if ((isError && message) || (isErrorReview && messageReview)) {
      toast.error(message || messageReview);
    }
  }, [isError, isErrorReview, message, messageReview]);



  if (isLoading) {
    return <Loading />
  }






  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    let pickup = pickupDate.split("-");
    let formattedPickup = `${pickup[1]}/${pickup[2]}/${pickup[0]}`;
    let drop = dropoffDate.split("-");
    let formattedDrop = `${drop[1]}/${drop[2]}/${drop[0]}`;

    try {
      await dispatch(addRental({
        id: id,
        dropDate: formattedDrop,
        pickupDate: formattedPickup
      })).unwrap();

      toast.success("Booking successful!");

      setShowBookingModal(false);
      setPickupDate("");
      setDropoffDate("");
    } catch (error) {
      toast.error(error.message || "Booking failed.");
    }
  };



  const handleSubmitReview = (e) => {
    e.preventDefault()
    dispatch(addReview({ id: id, comment: reviewText, rating: userRating }))
    setUserRating(0)
    if (isSuccessReview) {
      toast.success("Review added successfully!")
    }
    setReviewText("")
  }

  return (
    <div className="bg-white min-h-screen pt-15">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Car Image with Badge */}
          <div className="md:w-1/2 relative">
            <img
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/600x400?text=Car+Image"
              }}
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${car.isBooked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
              >
                {car.isBooked ? "Booked" : "Available"}
              </span>
            </div>
          </div>

          {/* Car Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
              <p className="text-sm text-gray-500 mb-2">by {car.company}</p>
              <p className="text-gray-700 mb-6">{car.description}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ₹{car.rate} <span className="text-sm font-normal text-gray-600">/day</span>
              </p>


              {
                !car.isBooked ? (<><button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full md:w-auto px-6 py-3 bg-[#FF6900] text-white font-medium rounded-lg shadow-md hover:bg-[#e05e00] transition-colors"
                >
                  Book Now
                </button></>) : (<>  <button className="w-full bg-orange-300 cursor-no-drop text-white font-medium py-3 rounded-2xl transition duration-200">

                  Unavailable
                </button></>)
              }
            </div>
          </div>
        </div>

        {/* Car Details Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium text-gray-900 capitalize">{car.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-medium text-gray-900">{car.company}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Fuel Type</p>
              <p className="font-medium text-gray-900 capitalize">{car.fuelType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Transmission</p>
              <p className="font-medium text-gray-900">{car.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium text-gray-900">{car.mileage} km/l</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Seats</p>
              <p className="font-medium text-gray-900">{car.seats}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Registration No</p>
              <p className="font-medium text-gray-900">{car.registration}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Rate</p>
              <p className="font-medium text-gray-900">₹{car.rate}/day</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{review.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Your Review</h2>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <StarRating rating={userRating} setRating={setUserRating} editable={true} />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="review"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900]"
                placeholder="Share your experience with this car..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF6900] text-white font-medium rounded-lg shadow-md hover:bg-[#e05e00] transition-colors"
              disabled={userRating === 0 || !reviewText.trim()}
            >
              Submit Review
            </button>
          </form>
        </div>
        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-[#00000027] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Book {car.name}</h2>
                <button onClick={() => setShowBookingModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="mb-4">
                  <label htmlFor="pickup-date" className="block text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    id="pickup-date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900]"
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="dropoff-date" className="block text-gray-700 mb-2">
                    Drop-off Date
                  </label>
                  <input
                    type="date"
                    id="dropoff-date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900]"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}


                  />
                </div>


                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#FF6900] text-white font-medium rounded-lg shadow-md hover:bg-[#e05e00] transition-colors"
                    disabled={!pickupDate || !dropoffDate}
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarDetailPage
