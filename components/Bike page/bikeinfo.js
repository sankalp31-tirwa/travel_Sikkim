import React from "react";
import Link from "next/link";
 

const Bikeinfo = () => {
  return (
    <>

      <div className="flex flex-col rounded-lg shadow-lg bg-white w-full border-8  ">


          <Link passHref href={"/product/wear-the-code"}>
            <button
              type="button"
              className="bg-yellow-900 mx-48 content-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg transition duration-150 ease-in-out"
            >
              Book Now
            </button>
          </Link>
      </div>

    </>
  );
};

export default Bikeinfo;
