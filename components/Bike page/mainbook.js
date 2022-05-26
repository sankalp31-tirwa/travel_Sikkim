import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
  "https://imgd.aeplcdn.com/1280x720/n/cw/ec/49739/himalayan-left-front-three-quarter.jpeg?q=80",
  "https://imgd.aeplcdn.com/1280x720/bw/ec/29133/Bajaj-Pulsar-150-Front-threequarter-97089.jpg?v=201711021421&wm=2&q=80",
  "https://imgd.aeplcdn.com/1280x720/bw/ec/40512/Bajaj-Avenger-Street-160--159847.jpg?wm=2&q=80",
  "https://imgd.aeplcdn.com/1280x720/n/cw/ec/103183/raider-125-right-front-three-quarter.jpeg?isig=0&q=80",
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  indicators: true,
  arrows: false,
};

function Mainbook() {
  return (
    <div>
      <Fade {...fadeProperties}>
        {/* // "-translate-y-6"> */}
        {images.map((each, index) => (
          <div key={index} className="flex justify-center ">
            <img
              alt="bike images"
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

export default Mainbook;
