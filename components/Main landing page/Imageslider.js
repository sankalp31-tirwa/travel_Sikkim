import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Makati_Skyline_for_banner.jpg",
  "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Berkeley-San_Francisco-Oakland--Sunset-Panorama.jpg",
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  indicators: true,
  arrows: false,
};

function Imageslider() {
  return (
    <div>
      <Fade {...fadeProperties}>
        {/* // "-translate-y-6"> */}
        {images.map((each, index) => (
          <img
            // width="100%"
            // height={384}
            // layout='responsive'
            alt="Main Page Slider component"
            className="object-cover w-full object-center sm:h-96 h-40"
            key={index}
            // style={{ width: "100%" }}
            src={each}
          />
        ))}
      </Fade>
    </div>
  );
}

export default Imageslider;
