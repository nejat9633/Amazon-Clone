import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductUrl } from "../../Api/EndPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${ProductUrl}/products/${id}`);
        setProduct(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error" + error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
 
   {(isLoading) ? (<Loader/>) :  (product && <ProductCard product={product} />)
  } 
   </>
   )}

export default ProductDetail;
