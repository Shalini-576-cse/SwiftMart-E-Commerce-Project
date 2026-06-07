import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/orders" element={<Orders />} />

        <Route
  path="/track/:id"
  element={<OrderTracking />}
/>
       
        <Route
           path="/admin"
             element={
               <ProtectedAdmin>

                 <AdminDashboard />

                  </ProtectedAdmin>
                }
                  />
        </Routes>

        
    </>
  );
}

export default App;