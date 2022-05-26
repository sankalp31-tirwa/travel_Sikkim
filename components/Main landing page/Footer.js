import React from "react";
// import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full text-gray-600 body-font  bottom-0">
        <div className="content-evenly container px-5 py-8 mx-auto flex justify-center">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0  ">
              © 2022
              <a
                href="https://nedevelopers.in/"
                className="text-gray-600 ml-1 bg-slate-100"
                rel="noopener noreferrer"
                target="_blank"
              >
                NE Developers.{" "}
              </a>
              All Rights Reserved.
            </p>
            {/* <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4    ">
              Developed by Pratik Pradhan & Sankalp Tirwa
            </p> */}
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4   ">
              Last Modified: May 18 2022
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
