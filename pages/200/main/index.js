import React from "react";
import Link from "next/link";
import AdminNav from "../../../components/adminNav";

const Index = () => {
  const Service = [
    // {
    //   img1: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    //   heading: "BikedetailImages",
    //   img2: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    //   link: "main/BikedetailImages",
    // },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/7210/7210744.png",
      heading: "ContactForm",
      img2: "https://cdn-icons-png.flaticon.com/512/7210/7210744.png",
      link: "main/ContactForm",
    },
    {
      img1: "https://cdn-icons-png.flaticon.com/512/2898/2898588.png",
      heading: "TourEnquiry",
      img2: "https://cdn-icons.flaticon.com/png/512/3393/premium/3393370.png?token=exp=1649319436~hmac=acd37be1039565673d0d551aafd58b27",
      link: "main/TourEnquiry",
    },
    // {
    //   img1: "https://cdn-icons-png.flaticon.com/512/2898/2898588.png",
    //   heading: "CabDetails",
    //   img2: "https://cdn-icons.flaticon.com/png/512/3393/premium/3393370.png?token=exp=1649319436~hmac=acd37be1039565673d0d551aafd58b27",
    //   link: "main/CabDetails",
    // },
  ];

  return (
    <div>
      <AdminNav />
      <div className="p-4 justify-center flex flex-wrap -m-4">
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
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
