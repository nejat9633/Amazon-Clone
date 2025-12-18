import { useContext, useEffect, useState } from 'react'
import Header from './components/Header/Header'
import CarouselEffect from "./components/CarouselEffect/CarouselEffect";
import Category from './components/Category/Category';
import Product from './components/Product/Product';
import Layout from './components/Layout/Layout';
import { DataContext } from './components/DataProvider/DataProvider';
import {auth} from './Utils/firebase'
import { Type } from './Utils/action.type'


function App() {
const [{user}, dispatch] = useContext(DataContext)

useEffect(()=>{
auth.onAuthStateChanged((authUser) => {
if(authUser) {
 
  dispatch({
type:Type.SET_USER,
user: authUser
  })
}
else {
  dispatch({
type:Type.SET_USER,
user: null
  })
}
})
},[]);

  return (
     <Layout/>
  )
}

export default App
