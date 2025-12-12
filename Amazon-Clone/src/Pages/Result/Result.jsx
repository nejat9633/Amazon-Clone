import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductUrl } from "../../Api/EndPoints";
import { useParams } from "react-router-dom";
import style from "./Result.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function Result() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${ProductUrl}/products/category/${categoryName}`
        );
        setResults(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error" + error);
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [categoryName]);

  return (
    <>
      <section>
        <h1 style={{ padding: "1rem" }}>Results</h1>
        <p style={{ padding: "1rem" }}>Category/{categoryName}</p> <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={style.products__container}>
            {results?.map((result, index) => {
              return <ProductCard product={result} key={index} />;
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default Result;
