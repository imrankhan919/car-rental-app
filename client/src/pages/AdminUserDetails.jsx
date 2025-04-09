import React, { useEffect, useState } from "react";
import { Users, User, Plus, Edit, Trash2, Mail, Calendar } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllRentalsAdmin } from "../features/admin/adminSlice";



const AdminUserDetails = () => {

  const {allUsers} = useSelector((state) => state.admin);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllRentalsAdmin())
  }, []);

  console.log(allUsers, "allUsers")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New User
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rentals
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                          {user?.avatarUrl ? (
                            <img className="h-full w-full object-cover" src={user?.avatarUrl} alt={user.name} />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name.toUpperCase()}</div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-10 py-4 whitespace-nowrap text-md text-gray-900">
                      {user?.rentals.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserDetails;