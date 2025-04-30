import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRental } from '../features/rentals/rentalSlice';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { LuFuel } from 'react-icons/lu';
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';
import { TbManualGearbox } from 'react-icons/tb';
import { GiPathDistance } from 'react-icons/gi';

const RentalDetails = () => {

    const { rental, isLoading, isSuccess, isError, message } = useSelector(state => state.rentals)
    const dispatch = useDispatch()
    const { rid } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        dispatch(getRental(rid));
    }, [rid, dispatch]);

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className="w-full mx-auto  rounded-3xl overflow-hidden bg-white pt-25">
            {/* Image */}
            <img
                src={rental?.car?.image}
                alt={rental?.car?.name}
                className="w-full h-94 md:h-96 object-contain bg-white"
            />


            {/* Details */}
            <div className="p-6 space-y-6">
                {/* Title */}
                <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                        <h2 className="text-2xl font-bold">{rental?.car?.name}</h2>
                        <p className="text-gray-500 text-sm">{rental?.car?.company} • {rental?.car?.category.toUpperCase()}</p>
                        <p className="text-xs text-gray-400">Reg. No: {rental?.car?.registration}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-semibold text-orange-500">₹{rental?.car?.rate} / day</span>
                        <p className={`text-sm ${rental?.car?.isBooked ? 'text-red-500' : 'text-green-500'}`}>
                            {rental?.car?.isBooked ? 'Currently Booked' : 'Available'}
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="bg-gray-100 p-4 rounded-xl capitalize"><LuFuel />
                        Fuel: {rental?.car?.fuelType}</div>
                    <div className="bg-gray-100 p-4 rounded-xl"><MdOutlineAirlineSeatReclineNormal />
                        Seats: {rental?.car?.seats}</div>
                    <div className="bg-gray-100 p-4 rounded-xl"><TbManualGearbox />
                        Transmission: {rental?.car?.transmission}</div>
                    <div className="bg-gray-100 p-4 rounded-xl"><GiPathDistance />
                        Mileage: {rental?.car?.mileage} km/l</div>
                </div>

                {/* Dates & Bill */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-gray-500">Pickup Date</p>
                        <p className="font-semibold">{rental?.rental?.pickupDate}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-gray-500">Drop Date</p>
                        <p className="font-semibold">{rental?.rental?.dropDate}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-gray-500">Total Bill</p>
                        <p className="text-lg font-bold text-orange-500">₹{rental?.rental?.totalBill}</p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Car Description</h3>
                    <p className="text-gray-600">{rental?.car?.description}</p>
                </div>
            </div>
        </div>

    );
};

export default RentalDetails;
