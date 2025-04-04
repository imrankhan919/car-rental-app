import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Car,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  Trash2,
  Edit,
  Star,
} from "lucide-react";

// Cars Management
function AllCarsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "BMW 3 Series",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      fuelType: "Hybrid",
      rate: 75,
      status: "Available",
    },
    {
      id: 2,
      name: "Mercedes C-Class",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      fuelType: "Petrol",
      rate: 85,
      status: "Rented",
    },
  ]);

  const [newCar, setNewCar] = useState({
    name: "",
    image: "",
    fuelType: "",
    rate: "",
  });

  const handleAddCar = (e) => {
    e.preventDefault();
    // Add car logic here
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cars Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
        >
          <PlusCircle size={20} />
          <span>Add New Car</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-white p-6 shadow">
          <h3 className="text-xl font-semibold mb-4">Add New Car</h3>
          <form onSubmit={handleAddCar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Car Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={newCar.name}
                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                className="mt-1 block w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={newCar.image}
                onChange={(e) =>
                  setNewCar({ ...newCar, image: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={newCar.fuelType}
                onChange={(e) =>
                  setNewCar({ ...newCar, fuelType: e.target.value })
                }
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Daily Rate ($)
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={newCar.rate}
                onChange={(e) => setNewCar({ ...newCar, rate: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 object-cover"
                      src={car.image}
                      alt={car.name}
                    />
                    <span className="ml-2">{car.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{car.fuelType}</td>
                <td className="px-6 py-4">${car.rate}/day</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs ${
                      car.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCarsPage;
