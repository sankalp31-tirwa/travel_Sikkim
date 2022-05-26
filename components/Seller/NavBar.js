import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../src/contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

const NavBar = () => {
  const { currentUser, logout, currentSeller } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // Show();
  }, []);

  const Show = async () => {
    if (currentSeller == null) {
      router.push("/Seller/SellerLogin");
    }
  };
  const Userlogout = (e) => {
    e.preventDefault();
    logout().then(router.push("/Seller/SellerLogin"));
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        {/* <h1>Welcome! {currentSeller && `the user :${currentSeller}`}</h1> */}
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {!currentSeller && (
            <>
              <Link href={"/Seller/seller"}>
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                  <span className="font-bold ml-3 text-xl">SELLER PAGE</span>
                </a>
              </Link>
              <p className="text-gray-600 text-xs italic">
                {currentSeller && `Please Do not Refresh After Login`}
              </p>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                {/* <Link href={"/Seller/SellerLogin"}>
                  <a className="mr-5 hover:text-gray-900">Tour</a>
                </Link> */}
                <Link href={"/Seller/SellerLogin"}>
                  <a className="mr-5 hover:text-gray-900">Orders</a>
                </Link>
                <Link href={"/Seller/SellerLogin"}>
                  <a className="mr-5 hover:text-gray-900">Bike</a>
                </Link>
                <Link href={"/Seller/SellerLogin"}>
                  <a className="mr-5 hover:text-gray-900">Cab</a>
                </Link>
                <Link passHref href="/Seller/SellerLogin">
                  <div>
                    <FaUserCircle className="cursor-pointer mr-5 w-8 h-8 rounded-full" />
                  </div>
                </Link>
              </nav>
            </>
          )}

          {currentSeller && (
            <>
              <Link href={"/Seller/seller"}>
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                  <span className="font-bold ml-3 text-xl">SELLER PAGE</span>
                </a>
              </Link>
              <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <h2 className="text-center text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                  Welcome!{" "}
                  {currentSeller && `the user :${currentSeller.user.email}`}
                  <p className="text-xs italic text-indigo-500 tracking-widest font-medium title-font mb-1">
                    {currentSeller && `Please Do not Refresh After Login`}
                  </p>
                  {!currentSeller &&
                    `You need to SignUp or Login to access these pages`}
                </h2>
              </div>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                {/* <Link href={"/Seller/Tour"}>
                  <a className="mr-5 hover:text-gray-900">Tour</a>
                </Link> */}
                <Link href={"Tour"}>
                  <a className="mr-5 hover:text-gray-900">Orders</a>
                </Link>
                <Link href={"/Seller/bike"}>
                  <a className="mr-5 hover:text-gray-900">Bike</a>
                </Link>
                <Link href={"/Seller/Cab"}>
                  <a className="mr-5 hover:text-gray-900">Cab</a>
                </Link>
                <button
                  onClick={Userlogout}
                  className="cursor-pointer inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200  text-base "
                >
                  LogOut
                </button>
              </nav>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
