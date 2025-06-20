import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ContactSellerPage from './pages/ContactSellerPage';
import Books from './pages/Books';
import Furniture from './pages/Furniture';
import Electronics from "./pages/Electronics";
import Stationery from "./pages/Stationery";
import Bags from "./pages/Bags";
import LabEquipment from "./pages/LabEquipment";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";
import SellItemPage from "./pages/SellItemPage";
import UserProfilePage from "./pages/UserProfilePage";
import ItemPostedPage from "./pages/ItemPostedPage";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function AppContent() {
  const location = useLocation();
  // Hide header/footer on login and register pages
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/ContactSellerPage" element={<PrivateRoute><ContactSellerPage /></PrivateRoute>} />
        <Route path="/Books" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/Furniture" element={<PrivateRoute><Furniture /></PrivateRoute>} />
        <Route path="/Electronics" element={<PrivateRoute><Electronics /></PrivateRoute>} />
        <Route path="/Stationery" element={<PrivateRoute><Stationery /></PrivateRoute>} />
        <Route path="/Bags" element={<PrivateRoute><Bags /></PrivateRoute>} />
        <Route path="/LabEquipment" element={<PrivateRoute><LabEquipment /></PrivateRoute>} />
        <Route path="/SellItemPage" element={<PrivateRoute><SellItemPage /></PrivateRoute>} />
        <Route path="/UserProfilePage" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
        <Route path="/ProductInfo/:name" element={<PrivateRoute><ProductInfo /></PrivateRoute>} />
        <Route path="/SellItemPage/ItemPostedPage" element={<PrivateRoute><ItemPostedPage /></PrivateRoute>} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;