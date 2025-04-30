import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { LuFuel } from 'react-icons/lu';
import { IoCarSportOutline } from 'react-icons/io5';

const RentalCard = ({ rental }) => {

    const {isLoading, isError , isSccess , message} = useSelector(state => state.rentals)


    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    if(isLoading){
        return <Loading/>
    }


    return (
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden">
            <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${rental.car.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className={`px-2 py-1 rounded-full text-sm font-medium 
                        ${rental.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"} 
                        backdrop-blur-sm shadow-sm border border-white/10`}>
                        <span className="text-[10px] font-medium text-white flex justify-center items-center">
                            {rental.available ? 'Active' : 'Unavailable'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{rental.car.name}</h2>
                        {/* <p className="text-gray-600">{rental.category}</p> */}
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-600">Bill ₹{rental.totalBill}</p>
                        <p className="text-sm text-gray-500">/day</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
                    <IoCarSportOutline />
                    <span className="text-sm">{rental.car.company}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
                        <LuFuel /><span className="text-sm capitalize">{rental.car.fuelType}</span>
                    </div>
                </div>

                <Link
                    to={`/my-rentals/${rental._id}`}
                    
                    className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-2xl transition duration-200"
                >
                    View Details
                </Link>

            </div>
        </div>
    );
};

export default RentalCard;
