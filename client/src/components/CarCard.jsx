import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, Car, Fuel, Gauge, Building2, Clock, CheckCircle, XCircle } from "lucide-react";
import { MdEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";

const CarCard = ({ car }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative h-48">
        <img
          src={car.image || car.image.url}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium" 
             style={{ backgroundColor: car.isBooked ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)' }}>
          {car.isBooked ? (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">Booked</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700">Available</span>
            </>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-200'}`}>
            {car.name}
          </h3>
          {/* <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {car.company}
          </p> */}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Building2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {car.company}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {car.category.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {car.fuelType.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {car.mileage} kmpl
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-lg font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}>
            ₹{car.rate}/day
          </span>
          <Link
            to={`/car/${car._id}`}
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
