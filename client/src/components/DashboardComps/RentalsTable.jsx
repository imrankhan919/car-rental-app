import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Mail, Phone, Calendar, Clock, Car, Tag, Fuel, DollarSign, AlertCircle } from 'lucide-react';

const RentalsTable = ({ users }) => {
  const [expandedUsers, setExpandedUsers] = useState({});
  
  // Toggle expansion for user rentals
  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };
  // Get appropriate styles based on rental status
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get only valid rentals from user
  const getUserRentals = (user) => {
    return user.rentals.filter(rental => 
      typeof rental === "object" && rental !== null && rental !== "null"
    );
  };
  
  // Check if user has any valid rentals
  const hasValidRentals = (user) => {
    return getUserRentals(user).length > 0;
  };
  
  // Format date for consistent display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Handle different date formats
    if (dateString.includes("GMT")) {
      return new Date(dateString).toLocaleDateString();
    }
    return dateString;
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center">
          <Car size={20} className="text-indigo-600 mr-2" />
          Recent Rentals
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-500" />
                  <span>Customer</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-500" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-500" />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Car size={16} className="text-gray-500" />
                  <span>Total Rentals</span>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span>Join Date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <React.Fragment key={user._id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {hasValidRentals(user) && (
                      <button 
                        onClick={() => toggleUserExpansion(user._id)}
                        className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
                      >
                        {expandedUsers[user._id] ? (
                          <ChevronUp size={18} className="text-indigo-600" />
                        ) : (
                          <ChevronDown size={18} className="text-indigo-600" />
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      <Car size={14} className="mr-1" />
                      {getUserRentals(user).length}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
                
                {/* Expanded rentals view */}
                {expandedUsers[user._id] && (
                  <tr>
                    <td colSpan="6" className="px-6 py-3">
                      <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200 shadow-inner">
                        <div className="flex items-center mb-4 space-x-2">
                          <Car size={18} className="text-indigo-600" />
                          <h3 className="text-lg font-semibold text-gray-700">Rental History</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                              <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Car size={14} className="text-gray-500" />
                                    <span>Car</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Fuel size={14} className="text-gray-500" />
                                    <span>Fuel Type</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span>Pickup</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span>Drop</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <DollarSign size={14} className="text-gray-500" />
                                    <span>Bill</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <AlertCircle size={14} className="text-gray-500" />
                                    <span>Status</span>
                                  </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  <div className="flex items-center space-x-1">
                                    <Clock size={14} className="text-gray-500" />
                                    <span>Actions</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                              {getUserRentals(user).map((rental) => (
                                <tr key={rental._id} className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                      <div className="flex-shrink-0 h-12 w-20 rounded overflow-hidden shadow-sm">
                                        <img 
                                          className="h-12 w-20 object-cover transform hover:scale-110 transition-transform duration-300" 
                                          src={rental.car?.image || "https://via.placeholder.com/150"} 
                                          alt={rental.car?.name || "Car"} 
                                        />
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">{rental.car?.name}</div>
                                        <div className="text-xs text-gray-500">{rental.car?.company}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                      <Fuel size={12} className="mr-1" />
                                      {rental.car?.fuelType}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Calendar size={14} className="mr-1 text-gray-400" />
                                      {formatDate(rental.pickupDate)}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Calendar size={14} className="mr-1 text-gray-400" />
                                      {formatDate(rental.dropDate)}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                                      <DollarSign size={14} className="mr-1 text-emerald-500" />
                                      {rental.totalBill}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full 
                                      ${getStatusStyles(rental.status)}`}>
                                      <AlertCircle size={12} className="mr-1" />
                                      {rental.status}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                      <button className="p-1 rounded hover:bg-indigo-100 transition-colors">
                                        <Clock size={16} className="text-blue-500" />
                                      </button>
                                      <button className="p-1 rounded hover:bg-indigo-100 transition-colors">
                                        {rental.status === "Completed" ? (
                                          <Check size={16} className="text-green-500" />
                                        ) : (
                                          <AlertCircle size={16} className="text-yellow-500" />
                                        )}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gradient-to-r from-white to-indigo-50">
        <span className="text-sm text-gray-500">Showing {users?.length} of {users?.length} users</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-indigo-600 border border-indigo-600 rounded text-sm text-white hover:bg-indigo-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalsTable;