import React from "react";
import { useContext } from "react";
import style from './Payment.module.css'
import {DataContext} from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'

function Payment() {
  const [{user, cart},initialState] = useContext(DataContext)
    console.log(cart);
    const totalItem = cart?.reduce((amount,item)=>{
      return item.amount + amount
    },0)
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
        <div   className={style.flex}>
          <h3>Review items and delivery</h3>
          <div className={style.cardWrap}>
{cart?.map((item,index )=>{
  return (
    <div >
  
      <ProductCard product={item} flex={true} key={index} />
    </div>
  );

})}

          </div>
        </div>
        <hr />
        {/* card form */}
        <div></div>
      </section>
    </>
  );
}

export default Payment;
