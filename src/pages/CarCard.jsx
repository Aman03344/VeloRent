import { Car, Fuel, Star } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CarCards = ({ car }) => {

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleBook = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${car?.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">


          <div
            className={`px-2 py-1 rounded-full text-sm font-medium 
             ${car.isBooked
                ? "bg-red-500/20 text-red-400"
                : "bg-green-700 text-green-400"
              } 
            backdrop-blur-sm shadow-sm border border-white/10`}
          >
            <span className="text-[10px] font-medium text-white flex justify-center items-center">
              {car?.isBooked ? "Unavailable" : "Available"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{car?.name}</h2>
            <p className="text-gray-600">{car?.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">₹{car?.rate}</p>
            <p className="text-sm text-gray-500">/day</p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
            <Car className="w-4 h-4" />
            <span className="text-sm">{car?.company}</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
            <Fuel className="w-4 h-4" />
            <span className="text-sm">{car?.fuelType}</span>
          </div>
        </div>




        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-2xl transition duration-200">
          <Link to={`/cars/${car?._id}`} onClick={handleBook}>
            Book Now
          </Link>
        </button>

      </div>
    </div>
  );
};

export default CarCards;
