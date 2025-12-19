import React, { useEffect, useState } from "react";
import LayOut from "../../components/layOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productsUrl } from "../../api/endPoint";
import ProductCard from "../../components/products/productsCard/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productsUrl}/${productId}`)
      .then((res) => {
        setProductDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (
        productDetail && (
          <ProductCard
            product={productDetail}
            key={productDetail.id}
            flex={true}
            readDescription={true}
            renderAdd={true}
          />
        )
      )}
    </LayOut>
  );
}

export default ProductDetail;
