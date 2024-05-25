import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Registeruser from "./components/Registeruser";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminpanelpages/AdminDashboard";
import HomePage from "./pages/HomePage";
import AdminAddProduct from "./pages/adminpanelpages/AdminAddProduct";
import Admin from "./pages/adminpanelpages/Admin";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register-user" element={<Registeruser />} />
          <Route path="admin-add-product" element={<AdminAddProduct />} />
          <Route path="*" element="No Page Found" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
