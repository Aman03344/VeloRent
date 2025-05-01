import React, { useEffect } from 'react';
import RentalCard from '../components/RentalCard';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { getRentalsForUser } from '../features/rentals/rentalSlice';

const MyRentals = () => {
    const dispatch = useDispatch();
    const { rentals, isLoading, isSuccess, isError, message } = useSelector(state => state.rentals);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getRentalsForUser());


    }, [dispatch]);

    useEffect(() => {
        if (isError && message) {
            toast.error(message);
        }
    }, [isError, message]);

    return (
        <div className="w-full px-4 py-10 min-h-screen  md:pt-25 pt-20">
            <h1 className="text-3xl font-bold mb-8 text-start px-2 md:px-6">My Rentals</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading /> {/* Fallback loading UI */}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {rentals?.length === 0 ? (
                        <h2 className="text-2xl text-gray-400 col-span-full text-center">No Rentals Yet</h2>
                    ) : (
                        rentals.map((rental) => (
                            <RentalCard key={rental._id} rental={rental} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MyRentals;
