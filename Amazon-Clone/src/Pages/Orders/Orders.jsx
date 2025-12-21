import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../Utils/firebase";
import ProductCard from "../../components/Product/ProductCard";
import style from './Orders.module.css'
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          console.log(snapShot);
          setOrders(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <section className={style.container}>
      <div className={style.orders__container}>
        <h2>Your Orders</h2>
{
  orders?.length == 0 && <div style={{padding:'1.2rem'}}>
    You don't have orders yet.
  </div>
}

        {/* ordered items */}
        <div className={style.orders__list}>
          {orders?.map((eachOrder, index) => {
            return (
              <div key={index}>
                <hr />
                <p>Order ID: {eachOrder.id} </p>
                {eachOrder?.data?.basket?.map((order) => {
                  return (
                    <ProductCard flex={true} product={order} key={order.id} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Orders;
