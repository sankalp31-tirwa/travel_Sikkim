import React from "react";
import Bikead from "../components/Bike page/bikead";
import Doc from "../components/Bike page/doc";
import Mainbook from "../components/Bike page/mainbook";
import Bikeinfo from "../components/Bike page/bikeinfo";
import ChooseBike from "../components/Bike page/choosebike";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Makati_Skyline_for_banner.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Berkeley-San_Francisco-Oakland--Sunset-Panorama.jpg",
];

function Bike() {
  return (
    <>
      {/* <Mainbook/> */}
      {/* <Bikeinfo/> */}
      {/* <Bikead/> */}
      <ChooseBike />
      <Doc />
    </>
  );
}

export default Bike;
