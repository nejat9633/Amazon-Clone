import React, { useContext } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import { Type } from "../../Utils/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const total = cart.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item)=>{
    dispatch({
      type:Type.ADD_TO_CART, item
    })

  }
  const decrement = (id)=>{
    dispatch({
      type:Type.REMOVE_FROM_CART, id
    })

  }

  return (
    <section className={style.container}>
      <div className={style.inner__container}>
        <div className={style.cart__container}>
          <h2>Hello,</h2>
          <h3>Your shopping basket </h3>
          <hr />
          {cart.length == 0 ? (
            <p>Oops! No item in your cart.</p>
          ) : (
            cart?.map((item, index) => {
              return (
                <div className={style.cart_product}>
                  <div className={style.cardWrap}>
                      <ProductCard
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                    key={index}
                  />
                  </div>
                

                  <div className={style.btn__container} >
                    <button onClick={() => increment(item)}>
                      <IoIosArrowUp size={20}/> 
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                     <IoIosArrowDown size={20}/>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart?.length !== 0 && (
          <div className={style.subtotal}>
            <div className={style.total}>
              <p>Subtotal ({cart?.length} items) </p>
              <CurrencyFormat amount={total} />
            </div>
            <span className={style.box}>
              <input type="checkbox" />
              <small> This order contains a gift.</small>
            </span>
            <Link to="/payment" className={style.button}>
              Continue to checkout
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
