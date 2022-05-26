import React from "react";
import Link from "next/link";
import Image from "next/image";

const error = () => {
  return (
    <div>
      <div
        className="flex
    items-center
    justify-center px-4 py-2 bg-white rounded-md shadow-xl"
      >
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-col">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="">
                  <Image
                    src="/404.png"
                    alt="Picture of the author"
                    width="397px"
                    height="547px"
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                </div>
              </div>

              <div className="pt-16 flex flex-col items-center">
                <h1 className="font-bold text-blue-600 text-9xl">404</h1>

                <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                  <span className="text-red-500">Oops!</span> You must have picked
                  the wrong door because I haven&apos;t been able to lay my eye on
                  the page you&apos;ve been searching for.
                </h6>

                <p className="mb-8 text-center text-gray-500 md:text-lg">
                  The page you&apos;re looking for doesn’t exist.
                </p>
                <Link passHref href={"/"}>
                  <button className="flex-shrink-0 text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-400 rounded text-lg mt-10 sm:mt-0">
                    Go Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default error;