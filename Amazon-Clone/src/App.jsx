import { useState } from 'react'
import Header from './components/Header/Header'
import CarouselEffect from "./components/CarouselEffect/CarouselEffect";
import Category from './components/Category/Category';
import Product from './components/Product/Product';

function App() {
  return (
    <>
     <Header/>
     <CarouselEffect/>
     <Category/>
     <Product/>
    </>
  )
}

export default App
