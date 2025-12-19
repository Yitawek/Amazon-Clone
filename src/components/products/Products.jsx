import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./productsCard/ProductCard";
import styles from "./productsCard/ProductCard.module.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  }, []);

  return (
    <section className={styles.products_container}>
      {products.map((item) => (
        <ProductCard product={item} key={item.id} renderAdd={true} />
      ))}
    </section>
  );
}

export default Products;
