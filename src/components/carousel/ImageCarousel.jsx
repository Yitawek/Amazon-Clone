import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import { img } from "./img/data";
import styles from "./ImageCarousel.module.css";

function ImageCarousel() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`slide-${index}`} />
          </div>
        ))}
      </ResponsiveCarousel>

      {/* Fade overlay */}
      <div className={styles.hero_img}></div>
    </div>
  );
}

export default ImageCarousel;
