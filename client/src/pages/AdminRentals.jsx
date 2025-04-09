import React, { useEffect, useState } from "react";
import { Calendar, Plus, Clock, User, Car, Check, X } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllRentalsAdmin } from "../features/admin/adminSlice";



const Rentals = () => {
  // Sample rentals data

  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllRentalsAdmin())
  }, [])
  
  const {allUsers, isAdminLoading} = useSelector((state) => state.admin);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };


  const getStatusColor = (isBooked) => {
    if (isBooked === true) {
      return "bg-green-100 text-green-800"; // Booked
    } else if (isBooked === false) {
      return "bg-blue-100 text-blue-800"; // Available
    }
    return "bg-gray-100 text-gray-800"; // Default (for unexpected values)
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Rentals Management</h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Rental
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rental ID
                  </th> */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {isAdminLoading ? (
                <tbody>
                <tr>
                  <td colSpan="6">
                    <div className="flex items-center justify-center h-[400px]">
                      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                {
                allUsers
                  .filter(user => Array.isArray(user.rentals) && user.rentals.length > 0) // Ensure rentals is a valid array
                  .map(user =>
                    user.rentals
                      .filter(rental => rental && rental._id && rental.car) // Exclude invalid rentals
                      .map(rental => (
                        <tr key={rental._id} className="hover:bg-gray-50">
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{rental._id}</div>
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className="text-sm text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Car className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className="text-sm text-gray-900">{rental.car?.name}</div>
                                <div className="text-xs text-gray-500">{rental.car?._id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {rental.pickupDate ? formatDate(rental.pickupDate) : "Invalid Date"} to{" "}
                                {rental.dropDate ? formatDate(rental.dropDate) : "Invalid Date"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                rental?.car?.isBooked
                              )}`}
                            >
                              {rental?.car?.isBooked ? "Booked" : "Available"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${rental.totalBill || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 rounded hover:bg-blue-50 text-blue-600">
                                <Clock className="h-5 w-5" />
                              </button>
                              {rental?.car?.isBooked !== "true" ? (
                                <button className="p-1 rounded hover:bg-green-50 text-green-600">
                                  <Check className="h-5 w-5" />
                                </button>
                              ) : (
                                <button className="p-1 rounded hover:bg-red-50 text-red-600">
                                  <X className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                  )
                  }
              </tbody>
              )}
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Showing {allUsers.reduce((count, user) => count + (user.rentals?.length || 0), 0)} rentals
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-sm text-white hover:bg-blue-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rentals;