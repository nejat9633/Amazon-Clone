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


function Layout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
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