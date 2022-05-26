import React from "react";
import Link from "next/link";
import Bikeinfo from "../components/Bike page/bikeinfo";

const Bike_list = () => {
  return (
    <>
      <section>
        <div className=" container flex flex-wrap  ">
          <Bikeinfo />
          <Bikeinfo />
          <Bikeinfo />
          <Bikeinfo />
          <Bikeinfo />
        </div>
      </section>
    </>
  );
};

export default Bike_list;
