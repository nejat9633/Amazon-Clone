import React, { useState } from "react";
import { useContext } from "react";
import style from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axiosApi";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utils/action.type";

function Payment() {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  // total number of items
  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // total price
  const totalPrice = cart?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // 1. backend | functions --> conatct to get the client secret
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // console.log(clientSecret);
      // 2. client side (confirmation)
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      //  console.log(paymentIntent);

      //  3. save the orders on the firestore db  and clean up cart
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        //empty the cart
dispatch({
  type:Type.EMPTY_CART
})

      setProcessing(false);
navigate("/orders",{state:{msg:'You have placed a new order'}});


    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
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
              <form onSubmit={handlePayment}>
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
                  <button type="submit">
                    {processing ? (
                      <div className={style.loading}>
                        <ClipLoader color="gray" size={12} />{" "}
                        <p>Please wait ...</p>{" "}
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
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
