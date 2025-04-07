import React, { useState } from "react";
import { Calendar, Plus, Clock, User, Car, Check, X } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";



const Rentals = () => {
  // Sample rentals data
  const [rentals, setRentals] = useState([
    {
      id: "RNT-001",
      customer: "John Smith",
      customerEmail: "john.smith@example.com",
      car: "Toyota Camry",
      carId: "CAR-001",
      startDate: "2025-04-01",
      endDate: "2025-04-08",
      status: "active",
      totalAmount: 385
    },
    {
      id: "RNT-002",
      customer: "Sarah Johnson",
      customerEmail: "sarah.j@example.com",
      car: "Honda Civic",
      carId: "CAR-002",
      startDate: "2025-04-02",
      endDate: "2025-04-05",
      status: "completed",
      totalAmount: 135
    },
    {
      id: "RNT-003",
      customer: "Michael Brown",
      customerEmail: "michael.b@example.com",
      car: "Ford Explorer",
      carId: "CAR-003",
      startDate: "2025-04-05",
      endDate: "2025-04-10",
      status: "active",
      totalAmount: 375
    },
    {
      id: "RNT-004",
      customer: "Emily Davis",
      customerEmail: "emily.d@example.com",
      car: "Nissan Altima",
      carId: "CAR-004",
      startDate: "2025-04-03",
      endDate: "2025-04-06",
      status: "completed",
      totalAmount: 150
    },
    {
      id: "RNT-005",
      customer: "James Wilson",
      customerEmail: "james.w@example.com",
      car: "Tesla Model 3",
      carId: "CAR-005",
      startDate: "2025-04-07",
      endDate: "2025-04-14",
      status: "upcoming",
      totalAmount: 630
    },
    {
      id: "RNT-006",
      customer: "Linda Miller",
      customerEmail: "linda.m@example.com",
      car: "Toyota Camry",
      carId: "CAR-001",
      startDate: "2025-03-15",
      endDate: "2025-03-20",
      status: "cancelled",
      totalAmount: 275
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rental ID
                  </th>
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
              <tbody className="bg-white divide-y divide-gray-200">
                {rentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rental.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{rental.customer}</div>
                          <div className="text-xs text-gray-500">{rental.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{rental.car}</div>
                          <div className="text-xs text-gray-500">{rental.carId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {rental.startDate} to {rental.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          rental.status
                        )}`}
                      >
                        {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${rental.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 rounded hover:bg-blue-50 text-blue-600">
                          <Clock className="h-5 w-5" />
                        </button>
                        {rental.status !== "completed" && rental.status !== "cancelled" ? (
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-500">Showing {rentals.length} rentals</span>
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