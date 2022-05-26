import React from "react";
import Link from "next/link";
import { useAuth } from "../../src/contexts/AuthContext";

const Serviceprovided = () => {
  const { currentSeller } = useAuth();

  const Service = [
    // {
    //   img1: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    //   heading: "Tours",
    //   img2: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    //   link: "Tour",
    // },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/7210/7210744.png",
      heading: "Bike Rentals",
      img2: "https://cdn-icons-png.flaticon.com/512/7210/7210744.png",
      link: "bike",
    },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/2898/2898588.png",
      heading: "Cab Rentals",
      img2: "https://cdn-icons.flaticon.com/png/512/3393/premium/3393370.png?token=exp=1649319436~hmac=acd37be1039565673d0d551aafd58b27",
      link: "Cab",
    },
  ];
  return (
    <>
      <section className="text-gray-600 body-font mb-8">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Services We provide
            </h1>
          </div>
        </div>
        {!currentSeller && (
          <div className="flex flex-wrap -m-4 justify-center">
            {Service.map((icon, index) => {
              return (
                <div key={index} className="p-4 md:w-1/3">
                  <Link passHref href="SellerLogin">
                    <a>
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col transition duration-500 hover:scale-110">
                        <div className="flex items-center mb-3">
                          <div className="overflow-hidden w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <img src={icon.img1} />
                          </div>
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            {icon.heading}
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <img className="h-28 mx-auto" src={icon.img1} />

                          {/* <a className="mt-3 text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a> */}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {currentSeller && (
          <div className="flex flex-wrap -m-4 justify-center">
            {Service.map((icon, index) => {
              return (
                <div key={index} className="p-4 md:w-1/3">
                  <Link passHref href={icon.link}>
                    <a>
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col transition duration-500 hover:scale-110">
                        <div className="flex items-center mb-3">
                          <div className="overflow-hidden w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <img src={icon.img1} />
                          </div>
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            {icon.heading}
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <img className="h-28 mx-auto" src={icon.img1} />

                          {/* <a className="mt-3 text-indigo-500 inline-flex items-center">
                            Learn More
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                          </a> */}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Serviceprovided;
