import React, { useEffect, useState } from "react";
// import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";

const click = () => {
  toast.warn("Hello You Found a button", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Maintourdetail = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full">
        <div className="mt-7 flex flex-col px-8 shadow-lg ">
          <h1 className="text-2xl font-bold text-blue-900">
            WE Are The Coders
          </h1>
          <p onClick={click} className="py-3 text-lg cursor-pointer w-2 ">
            BYE
          </p>
        </div>

        <section
          className="text-gray-600 body-font z-0 "
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("https://static.toiimg.com/photo/88689758/88689758.jpg?v=3")`,
          }}
        >
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0"></div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">
                Hello
              </h2>
              <div className="">
                <img
                  src="200.jpg"
                  alt="Picture of the author"
                  width="368px"
                  height="547px"
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap -m-4">
        <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
              Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintourdetail;
