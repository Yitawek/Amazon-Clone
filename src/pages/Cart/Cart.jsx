import React, { useContext } from "react";
import LayOut from "../../components/layOut/LayOut";
import { DataContext } from "../../components/dataProvider/DataProvider";
import ProductCard from "../../components/products/productsCard/ProductCard";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { type } from "../../Utility/actionType";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const [state, dispatch] = useContext(DataContext);
  const basket = state.basket;

  // Calculate total price
  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const increment = (product) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: product,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <div className={styles.cart_container}>
        {/* LEFT SIDE - CART ITEMS */}
        <div className={styles.cart_left}>
          <h2>Your Shopping Cart</h2>

          {basket.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            basket?.map((product) => (
              <section key={product.id}>
                <ProductCard
                  product={product}
                  flex={true}
                  readDescription={false}
                  renderAdd={false}
                />

                {/* QUANTITY CONTROL */}
                <div className={styles.qty_controls}>
                  <button onClick={() => decrement(product.id)}>
                    {product.amount === 1 ? <DeleteIcon /> : <RemoveIcon />}
                  </button>

                  <span>{product.amount}</span>

                  <button onClick={() => increment(product)}>
                    <AddIcon />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {/* RIGHT SIDE - SUBTOTAL BOX */}
        <div className={styles.cart_right}>
          <div className={styles.subtotal_box}>
            <p>
              Subtotal ({basket.length} items): $
              {numeral(total).format("0,0.00")}
            </p>

            <span className={styles.gift_option}>
              <input type="checkBox" />
              <p>This order contains a gift</p>
            </span>

            <Link to="/payment" className={styles.checkout_btn}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Cart;
