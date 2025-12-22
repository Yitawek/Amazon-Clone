// src/pages/payment/Payment.jsx
import React, { useState, useContext } from "react";
import LayOut from "../../components/layOut/LayOut";
import styles from "./Payment.module.css";
import numeral from "numeral";
import { db } from "../../Utility/firebase";

import { DataContext } from "../../components/dataProvider/DataProvider";
import { Link, useNavigate } from "react-router-dom";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../api/axios";
import { collection, doc, setDoc } from "firebase/firestore";
import { type } from "../../Utility/actionType";

const CheckIcon = () => <span className="check-icon">✓</span>;
const LockIcon = () => <span className="lock-icon">🔒</span>;

function Payment() {
  const [state, dispatch] = useContext(DataContext);
  const { basket, user } = state;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const userAddress = user?.address || {
    name: "John Doe",
    street: "123 Main Street",
    apartment: "Apartment 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "(123) 456-7890",
    email: "john@gmail.com",
  };

  const [cardError, setcardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const handleChange = (e) => {
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!user) {
      setcardError("You must be logged in to pay.");
      return;
    }
    if (total <= 0) {
      setcardError("Your cart is empty or total is 0.");
      return;
    }

    try {
      setProcessing(true);
      setcardError("");

      const response = await axiosInstance.post(
        `/payment/create?total=${Math.round(total * 100)}`
      );

      const clientSecret = response.data.clientSecret;

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || userAddress.email,
              name: userAddress.name,
            },
          },
        }
      );

      if (error) {
        setcardError(error.message);
        setProcessing(false);
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setcardError(`Payment status: ${paymentIntent?.status || "unknown"}`);
        setProcessing(false);
        return;
      }

      const userRef = doc(collection(db, "user"), user.uid);
      const ordersRef = collection(userRef, "orders");
      const orderDoc = doc(ordersRef, paymentIntent.id);

      await setDoc(orderDoc, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setcardError("");
      setProcessing(false);

      dispatch({ type: type.EMPTY_BASKET });
      navigate("/orders");
    } catch (error) {
      setProcessing(false);
      setcardError(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <LayOut>
      <div className={styles.paymentContainer}>
        <div className={styles.paymentHeader}>
          <div className={styles.amazonLogoHeader}>
            <p>Amazon</p>
          </div>
          <h1 className={styles.checkouttitle}>
            Checkout {basket.length} items
          </h1>
          <div className={styles.securecheckout}>
            <LockIcon /> Secure checkout
          </div>
        </div>

        <div className={styles.paymentContent}>
          <div className={styles.paymentSection}>
            <div className={styles.sectionHeader}>
              <h2>1. Delivery address</h2>
              <Link to="/address" className={styles.editBtn}>
                Edit
              </Link>
            </div>
            <div className={styles.addressCard}>
              <div className={styles.addressInfo}>
                <p>
                  <strong>{userAddress.name}</strong>
                </p>
                <p>{userAddress.street}</p>
                {userAddress.apartment && <p>{userAddress.apartment}</p>}
                <p>
                  {userAddress.city}, {userAddress.state} {userAddress.zipCode}
                </p>
                <p>{userAddress.country}</p>
                <p>Phone: {userAddress.phone}</p>
                <p>Email: {userAddress.email}</p>
              </div>
              <label className={styles.defaultAddressCheckbox}>
                Use as my default address
              </label>
            </div>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <div className={styles.sectionHeader}>
            <h2>3. Review items</h2>
            <Link to="/cart" className={styles.editBtn}>
              Edit
            </Link>
          </div>
          <div className={styles.itemsList}>
            {basket.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h4>{item.title}</h4>
                  <p className={styles.itemQuantity}>Quantity: {item.amount}</p>
                  <p className={styles.itemPrice}>
                    ${(item.price * item.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.paymentSection}>
          <div className={styles.cardForm}>
            <label>Card number</label>
            <div className={styles.paymentCardContainer}>
              <form onSubmit={handlePayment} style={{ margin: "10px" }}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {succeeded && (
                  <small style={{ color: "green" }}>
                    Payment succeeded, thank you!
                  </small>
                )}

                <CardElement onChange={handleChange} />

                <div style={{ margin: "10px" }}>
                  <span>Total order | {numeral(total).format("0,0.00")}</span>
                </div>
                <button
                  className={styles.payBtn}
                  type="submit"
                  disabled={!stripe || processing}
                >
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Payment;
