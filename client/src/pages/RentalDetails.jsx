import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRental } from '../features/rental/rentalSlice'
import { Calendar, Clock, DollarSign, Fuel, Info, Settings, Tag, User } from 'lucide-react'

const RentalDetails = () => {
    const {rental} = useSelector((state) => state.rental)

const {rid} = useParams()
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getRental(rid))
}, [rid])
console.log(rental)
  return (
    <div className="max-w-4xl h-full py-20 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Car Image */}
      <div className="relative h-72">
        <img 
          src={rental?.car?.image} 
          alt={`${rental.car?.company} ${rental.car?.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">{rental.car?.company} {rental.car?.name}</h1>
          <div className="flex items-center mt-2 space-x-3">
            <span className="bg-emerald-500/80 px-3 py-1 rounded-full text-sm font-medium">
              {rental.car?.category.toUpperCase()}
            </span>
            <span className="bg-black/50 px-3 py-1 rounded-full text-sm">
              {rental.car?.registration}
            </span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-6">
        {/* Car Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Fuel className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Fuel Type</p>
              <p className="font-medium">{rental.car?.fuelType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Tag className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Daily Rate</p>
              <p className="font-medium">${rental.car?.rate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{rental.car?.isBooked ? 'Booked' : 'Available'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-medium truncate">{rental.rental?._id}</p>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h2 className="font-semibold text-gray-900">Rental Period</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-500">Pickup Date</p>
                <p className="font-medium">{rental.rental?.pickupDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-500">Drop Date</p>
                <p className="font-medium">{rental.rental?.dropDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Bill */}
        <div className="bg-emerald-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              <span className="text-lg font-medium text-emerald-900">Total Bill</span>
            </div>
            <span className="text-3xl font-bold text-emerald-600">${rental.rental?.totalBill}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button className="flex-1 bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Modify Booking</span>
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>View History</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentalDetails