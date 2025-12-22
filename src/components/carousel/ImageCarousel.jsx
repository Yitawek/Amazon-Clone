import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import { img } from "./img/data";
import styles from "./ImageCarousel.module.css";

function ImageCarousel() {
  return (
    <section className={styles.carousel}>
      <ResponsiveCarousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((src, index) => (
          <div key={index} className={styles.slide}>
            <img src={src} alt={`Promotional banner ${index + 1}`} />
          </div>
        ))}
      </ResponsiveCarousel>

      <div className={styles.fadeOverlay} aria-hidden="true" />
    </section>
  );
}

export default ImageCarousel;
