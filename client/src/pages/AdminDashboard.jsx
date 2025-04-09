import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { Users, Car, Calendar, TrendingUp } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import StatCard from "../components/DashboardComps/StatCard";
import RentalsTable from "../components/DashboardComps/RentalsTable";
import { useSelector } from "react-redux";
import { adminAllCars, getAllRentalsAdmin, getAllReviewsAdmin } from "../features/admin/adminSlice";
import Loader from "../components/Loader";

const AdminDashboard = () => {

  const { cars, reviews, allRentals, isAdminLoading, isAdminError, isAdminSuccess, adminErrorMessage } = useSelector(
      (state) => state.admin
    );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(adminAllCars());
      dispatch(getAllRentalsAdmin());
      dispatch(getAllReviewsAdmin());
      if (isAdminError && adminErrorMessage) {
        toast.error(adminErrorMessage);
      } 
      }
    , []);

      const {users, totalUsers, totalRentals} = allRentals;
    console.log( users, "users", totalUsers, "totalUsers", totalRentals,  "totalRentals");

    
    // const { user } = useSelector((state) => state.auth);
    // const { theme } = useSelector((state) => state.theme);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={totalUsers}
            icon={Users} 
            trend={{ value: 12, isPositive: true }} 
          />
          <StatCard 
            title="Total Cars" 
            value={cars?.length} 
            icon={Car} 
            trend={{ value: 8, isPositive: true }} 
          />
          <StatCard 
            title="Active Rentals" 
            value={totalRentals}
            icon={Calendar} 
            trend={{ value: 5, isPositive: true }} 
          />
          <StatCard 
            title="Monthly Revenue" 
            value="$12,543" 
            icon={TrendingUp} 
            trend={{ value: 16, isPositive: true }} 
          />
        </div>
        
        {isAdminLoading ? <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div> :
          <div className="mb-8">
          <RentalsTable users={users} />
        </div>}
      </main>
    </div>
  );
};

export default AdminDashboard;
