import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavDropdown from "./NavbarDropdown";
import Othersmenu from "./Othersdropdownmenu";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../src/contexts/AuthContext";
import Marquee from "react-fast-marquee";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const Userlogout = (e) => {
    e.preventDefault();
    logout();
  };
  // console.table(currentUser);
  // console.table(currentUser);

  return (
    <>
      <header className="text-gray-600 body-font bg-white sticky top-0 z-20 border-b-2 border-gray-300">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <Image
                width={40}
                height={40}
                // alt="logo"
                // src="https://sntonline.sikkim.gov.in/NewAssets/img/logo.png"
                src="/gate3.jpg"
                className="rounded"
              />
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              <span className="font-bold font-serif italic ml-3 text-xl">
                Travel.Sikkim.Co
              </span>
            </a>
          </Link>

          <div className="relative lg:w-2/3 md:w-1/2">
            <Marquee direction="right" speed="100" pauseOnClick="true">
              {/* <img
                className="h-10"
                src="https://c.tenor.com/xT0EW92-o60AAAAi/batman-dc.gif"
              /> */}
              {/* <img
                className="h-10"
                src="https://c.tenor.com/PcRFU5UDkmMAAAAi/%E3%83%8F%E3%82%A4%E3%82%AC%E3%82%A4-highgai.gif"
              /> */}
              {/* <img
                className="h-10"
                src="https://c.tenor.com/dUJLlNK3kt8AAAAi/orchestrated-orchestratednl.gif"
              /> */}

              {/* <img
                className="h-10 mr-16"
                src="https://pickyourtrail.com/blog/wp-content/uploads/2020/07/tanmoy-biswas-j69Rw3OVR6Q-unsplash-1-scaled.jpg"
              />
              <img
                className="h-10 mr-16"
                src="https://www.tripsavvy.com/thmb/ypa6kBcocUQL9pARaoIclmHa84s=/1885x1414/smart/filters:no_upscale()/GettyImages-606222988-5a823cff1d64040037dfd9a1.jpg"
              />
              <img
                className="h-10 mr-16"
                src="https://assets.traveltriangle.com/blog/wp-content/uploads/2015/07/Zuluk-Sikkim.jpg"
              />
              <img
                className="h-10 mr-16"
                src="https://heenatours.in/blog/wp-content/uploads/2016/08/Namachi_Heena_01.jpg"
              /> */}

              <h2 className="italic">Notice OR Advertisement</h2>
            </Marquee>
          </div>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/tour">
              <a className="mr-5 hover:text-gray-900">Tour</a>
            </Link>
            <Link href="/bike">
              <a className="mr-5 hover:text-gray-900">Bike</a>
            </Link>
            <Link href="/cab">
              <a className="mr-5 hover:text-gray-900">Cab</a>
            </Link>
            {/* <Link href="/other">
              <a className="mr-5 hover:text-gray-900">Others</a>
            </Link>             */}
            <Othersmenu />
            {!currentUser && (
              <Link passHref href="/user_login">
                <div>
                  <FaUserCircle className="cursor-pointer mr-5 w-8 h-8 rounded-full" />
                </div>
              </Link>
            )}
            {currentUser && <NavDropdown />}
          </nav>
          {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
          </button> */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
