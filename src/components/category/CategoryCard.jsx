import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className={styles.card}>
      <Link to={`./category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
