import React from "react";
import Link from "next/link";
import Serviceprovided from "../../components/Seller/Serviceprovided";
import NavBar from "../../components/Seller/NavBar";

const seller = () => {
  return (
    <>
      {/* <div className="mt-24 shadow-sm">
        <div className="w-full">
          <img
            className="sm:w-full m-0 object-center sm:h-96"
            src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          />
          <h2 className="sm:top-0 sm:right-9 sm:absolute rounded-lg text-black shadow-blue-50 text-center sm:text-8xl text-4xl font-medium">
            Seller Panel
          </h2>
        </div>
      </div> */}
      <NavBar />

      <Serviceprovided />
      <footer className="w-full flex-shrink-0  mt-2 border-t-2 border-black">
        <Link passHref href="/">
          <h2 className="hover:cursor-pointer h-16 w-full flex justify-center py-2 px-4 font-medium  text-white bg-pink-600 hover:bg-pink-700">
            Go Back to Home Page
          </h2>
        </Link>
        {/* <Link passHref href="Tour"></Link> */}
      </footer>
    </>
  );
};

export default seller;
