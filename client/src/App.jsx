import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashBoard";
import AllCarsPage from "./components/ui/admin/AllCarsPage";
import AllRentalsPage from "./components/ui/admin/AllRentalsPage";
import AllReviews from "./components/ui/admin/AllReviews";
import { ToastContainer } from "react-toastify";
import PrivateComponent from "./components/PrivateComponent";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<PrivateComponent />}>
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="" element={<AllCarsPage />} />
            <Route path="rentals" element={<AllRentalsPage />} />
            <Route path="reviews" element={<AllReviews />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
