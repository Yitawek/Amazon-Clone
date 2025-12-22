// src/pages/orders/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import LayOut from "../../components/layOut/LayOut";
import styles from "./Orders.module.css";
import numeral from "numeral";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/dataProvider/DataProvider";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Orders() {
  const [state] = useContext(DataContext);
  const { user } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(collection(db, "user"), user.uid);
    const ordersRef = collection(userRef, "orders");
    const ordersQuery = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <LayOut>
      <div className={styles.orders}>
        <h1>Your orders</h1>
        {!orders.length && <p>No orders yet.</p>}
        {orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <div className={styles.orderHeader}>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {numeral(order.data.amount / 100).format("0,0.00")} USD
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.data.created * 1000).toLocaleString()}
              </p>
            </div>
            <div className={styles.orderItems}>
              {order.data.basket?.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.amount}</p>
                    <p>${(item.price * item.amount).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LayOut>
  );
}

export default Orders;
