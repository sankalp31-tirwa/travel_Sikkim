import React from "react";
import Link from "next/link";
import Image from "next/image";

const error = () => {
  const BikeDoc = [
    {
      img1: "https://cdn-icons-png.flaticon.com/512/4299/4299685.png",
      Content: "Passport-size photo (2nos)",
    },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/6158/6158293.png",
      Content: "A valid Driving License For the Rider",
    },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/1534/1534155.png",
      Content: "Voter ID, Aadhar card or Passport",
    },
  ];
  return (
    <>
      <div className="flex my-6 justify-center">
        <div className="w-5/6 h-1 rounded-full bg-black inline-flex"></div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="text-center mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 ">
              Documents Required while Visiting Sikkim
            </h1>
            <p className="mt-8 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              Unlike the neighboring state of West Bengal where Darjeeling is
              located, Sikkim has certain entry restrictions. In fact the whole
              of Sikkim is under restricted area regime due to its proximity to
              neighboring countries like China, Nepal and Bhutan.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex mb-8 ">
            {BikeDoc.map((icon, index) => {
              return (
                <div key={index} className=" md:w-1/3">
                  <div className="flex rounded-lg h-full flex-col">
                    <div className="mx-auto md:w-1/3 flex flex-col text-center items-center">
                      <div className="inline-flex ">
                        <Image
                          width={80}
                          height={80}
                          alt="Passport-size photo (2nos)"
                          src={icon.img1}
                        />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-medium ">
                          {icon.Content}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default error;
