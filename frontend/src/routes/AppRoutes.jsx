import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MeasurementsComponent from "../pages/Measurements";
import Customers from "../pages/Customer";

export default function AppRoutes() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/measurements" element={<MeasurementsComponent/>}/>
      <Route path = "/customer" element={<Customers/>}/>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer/>
    </>
  );
}
