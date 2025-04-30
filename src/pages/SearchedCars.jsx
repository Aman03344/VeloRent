import React, { useEffect } from 'react';
import { findCar } from '../features/CAR/carSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Car, Fuel } from 'lucide-react';

const SearchedCars = () => {
    const { cars, isSuccess, isError, isLoading, message } = useSelector((state) => state.car);
    const dispatch = useDispatch();
    const { query } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(findCar(query));

        if (isError && message) {
            toast.error(message);
        }
    }, [dispatch, query, isError, message]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-24">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <p className="text-gray-600 mb-6">{cars.length} cars found</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.length === 0 ? (
                    <div className="text-center col-span-full text-gray-500 text-xl font-medium">
                        Car not found
                    </div>
                ) : (
                    cars.map((car) => (
                        <div key={car._id} className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                            <div
                                className="relative h-64 bg-cover bg-center"
                                style={{ backgroundImage: `url(${car?.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                <div className="absolute top-4 left-4 right-4 flex justify-between">
                                    <div
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${car.isBooked ? " bg-red-400 text-red-300" : "bg-green-700 text-green-400"
                                            } backdrop-blur-sm shadow-sm border border-white/10`}
                                    >
                                        <span className="text-[10px] font-medium text-white flex justify-center items-center">
                                            {car.isBooked ? "Booked" : "Available"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{car?.name}</h2>
                                        <p className="text-gray-600">{car.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">₹{car?.rate}</p>
                                        <p className="text-sm text-gray-500">/day</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
                                        <Car className="w-4 h-4" />
                                        <span className="text-sm">{car.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
                                        <Fuel className="w-4 h-4" />
                                        <span className="text-sm capitalize">{car?.fuelType}</span>
                                    </div>
                                </div>

                                {!car.isBooked ? (
                                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-2xl transition duration-200">
                                        <Link to={`/cars/${car?._id}`}>Book Now</Link>
                                    </button>
                                ) : (
                                    <button className="w-full bg-orange-300 cursor-no-drop text-white font-medium py-3 rounded-2xl transition duration-200">
                                        Unavailable
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchedCars;
