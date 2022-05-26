import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
  "https://imgd.aeplcdn.com/664x374/cw/ec/31432/Mahindra-Xylo-Exterior-109406.jpg?v=201711021421&q=75",
  "https://imgd.aeplcdn.com/664x374/ec/BD/f0/10752/img/m/Tata-Sumo-Gold-Right-Front-Three-Quarter-48868_ol.jpg?v=201711021421&q=75",
  "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75",
  "https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/innova-crysta-exterior-right-front-three-quarter-3.jpeg?q=75",
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  indicators: true,
  arrows: false,
};

function imagecab() {
  return (
    <div>
      <Fade {...fadeProperties}>
        {/* // "-translate-y-6"> */}
        {images.map((each, index) => (
          <div key={index} className="flex justify-center ">
            <img
              alt="Cab images"
              className="object-contain top rounded-lg w-5/6 sm:h-96 h-40"
              // style={{ width: "100%" }}
              src={each}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default imagecab;
