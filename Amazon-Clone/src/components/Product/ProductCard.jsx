import React from 'react'
import style from './Product.module.css'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'

function ProductCard({product}) {
    const {image,title,rating,price} = product
  return (
    <div className={style.card__container}>
      <a href="">
        <div className={style.imgBox}>
          <img src={image} alt={title} />
        </div>
      </a>
      <div>
        <h3>{title}</h3>

        <div className={style.rating}>
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button>
            Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard