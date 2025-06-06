import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getRentalsForAdmin } from "../../../features/rentals/rentalSlice";
import Loader from "../../Loader";

// Rentals Management
function AllRentalsPage() {
  const { rentals, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.rentals
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRentalsForAdmin());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Rental Management
      </h2>
      <div className="bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rental ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td className="px-6 py-4">#{rental.id}</td>
                <td className="px-6 py-4">{rental.car}</td>
                <td className="px-6 py-4">{rental.user}</td>
                <td className="px-6 py-4">
                  {rental.startDate} - {rental.endDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs ${
                      rental.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {rental.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllRentalsPage;
