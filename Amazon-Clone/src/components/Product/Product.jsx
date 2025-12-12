import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from './Product.module.css'
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
        setIsLoading(false)
      } catch (error) {
        console.log("Error: " + error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.products__container}>
          {products?.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
        </div>
      )}
    </>
  );
}

export default Product;
