import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/products/productsCard/ProductCard";
import styles from "../../components/products/productsCard/ProductCard.module.css";
import { categoryUrl } from "../../api/endPoint";
import LayOut from "../../components/layOut/LayOut";
import Loader from "../../components/Loader/Loader";

function Results() {
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams(); // get category from route
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${categoryUrl}/${categoryName}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className={styles.category_title}>{categoryName}</h2>
          <section className={styles.products_container}>
            {products.length > 0 ? (
              products.map((item) => (
                <ProductCard renderAdd={true} product={item} key={item.id} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </section>
        </>
      )}
    </LayOut>
  );
}

export default Results;
