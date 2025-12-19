import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { Rating } from "@mui/material";
import numeral from "numeral";
import { DataContext } from "../../dataProvider/DataProvider";
import { type } from "../../../Utility/actionType";

function ProductCard({ product, flex, readDescription, renderAdd }) {
  const [state, dispatch] = useContext(DataContext);

  const addToCard = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: product,
    });
  };

  return (
    <div
      className={`${styles.product_card} ${flex ? styles.product_flex : ""}`}
    >
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>

      <div>
        <h3>{product.title}</h3>

        {readDescription && (
          <div style={{ width: "700px" }}>{product.description}</div>
        )}

        <div className={styles.product_info}>
          <p className={styles.rating}>
            <Rating
              value={product.rating?.rate}
              precision={0.1}
              readOnly
              size="small"
            />
          </p>

          <p className={styles.price}>
            ${numeral(product.price).format("0,0.00")}
          </p>
        </div>

        {renderAdd && (
          <button
            onClick={() => {
              addToCard();
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
