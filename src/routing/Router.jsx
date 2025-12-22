import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import Orders from "../pages/Orders/Orders.jsx";
import Auth from "../pages/Auth/Auth.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import Results from "../pages/Results/Results";
import ProtectedRoute from "../components/protectedRoute/protectedRoute.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SeYoIBxyrbyBy8TCzVBgQfEZyI739HjjQ6yeBDn4RxI2NJ34ta4fCTNTIF1OZvJkZZ63TO7b6g3TjjwmcVLdxXd00YCk4UujK"
);

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
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"You must be logged in to pay."}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must be logged in to Order."}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
