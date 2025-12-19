import React from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "./categoryList.js";
import styles from "./CategoryCard.module.css";

function Categoery() {
  return (
    <section className={styles.card_container}>
      {categories.map((cata, index) => (
        <CategoryCard key={index} data={cata} />
      ))}
    </section>
  );
}

export default Categoery;
