import React, { useState } from "react";
import { useContext } from "react";
import style from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

function Payment() {
  const [{ user, cart }, initialState] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);

  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = cart?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  return (
    <>
      {/* header */}
      <div className={style.payment_header}>Checkout ({totalItem}) items </div>
      {/* payment method */}
      <section className={style.payment}>
        {/* address */}
        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={style.flex}>
          <h3>Review items and delivery</h3>
          <div className={style.cardWrap}>
            {cart?.map((item, index) => {
              return (
                <div>
                  <ProductCard product={item} flex={true} key={index} />
                </div>
              );
            })}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={style.flex}>
          <h3>Payment methods</h3>
          <div className={style.payment_card_container}>
            <div>
              <form action="">
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                <div className={style.payment_price}>
                  {/* total price  */}
                  <div>
                    <span>
                      <p>Total Price |</p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
