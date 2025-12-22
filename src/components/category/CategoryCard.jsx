import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ data }) {
  return (
    <article className={styles.card}>
      <Link to={`/category/${data.name}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src={data.image} alt={data.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.cta}>Shop Now</p>
        </div>
      </Link>
    </article>
  );
}

export default CategoryCard;
