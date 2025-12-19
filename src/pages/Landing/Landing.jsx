import React from "react";
import LayOut from "../../components/layOut/LayOut";
import Carousel from "../../components/carousel/ImageCarousel";
import Categoery from "../../components/category/Categoery";
import Products from "../../components/products/Products";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Categoery />
      <Products />
    </LayOut>
  );
}

export default Landing;
