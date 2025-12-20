import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from '../../Pages/Auth/Signup';
import Cart from '../../Pages/Cart/Cart';
import Orders from '../../Pages/Orders/Orders';
import Payment from '../../Pages/Payment/Payment';
import Landing from '../../Pages/Landing/Landing';
import ProductDetail from '../../Pages/ProductDetail/ProductDetail';
import Result from '../../Pages/Result/Result';
import SharedLayout from './SharedLayout'
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js/checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


function Layout() {

  //  console.log(stripePromise);
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/payment"
            element={
              <Elements
                stripe={stripePromise}
              >
              <Payment />
          </Elements> 
            }
          />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Layout