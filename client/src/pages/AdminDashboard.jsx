import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { Users, Car, Calendar, TrendingUp } from "lucide-react";
import Sidebar from "../components/DashboardComps/SideBar";
import StatCard from "../components/DashboardComps/StatCard";
import RentalsTable from "../components/DashboardComps/RentalsTable";
import { useSelector } from "react-redux";
import { adminAllCars, getAllRentalsAdmin, getAllReviewsAdmin } from "../features/admin/adminSlice";

const AdminDashboard = () => {

  const { cars, reviews, rentals, isAdminLoading, isAdminError, isAdminSuccess, adminErrorMessage } = useSelector(
      (state) => state.admin
    );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(adminAllCars());
      dispatch(getAllRentalsAdmin());
      dispatch(getAllReviewsAdmin());
      if (isAdminError && adminErrorMessage) {
        toast.error(adminErrorMessage);
      } }
    , []);
  
    console.log("cars" , cars ,"reviews" , reviews, "rentals", rentals,)
  
    const { user } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
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
            value={rentals?.users?.length || "21"}
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
            value="18" 
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
        
        <div className="mb-8">
          <RentalsTable />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
