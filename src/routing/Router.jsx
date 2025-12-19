import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import Orders from "../pages/Orders/Orders";
import Auth from "../pages/Auth/Auth.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import Results from "../pages/Results/Results";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
