// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import Navbar from "../components/Navbar";
import Demo from "../components/Main landing page/Demo";
import "../styles/globals.css";
import Footer from "../components/Main landing page/Footer";
import AuthContextProvider, { useAuth } from "../src/contexts/AuthContext";

// function MyApp({ Component, pageProps }) {
//   return <>
//   <Navbar/>
//   <hr/>
//   {/* <Demo/> */}
//   <Component {...pageProps} />
//   <Footer/>
//   </>
// }

// export default MyApp

import { useRouter } from "next/router";

function Myapp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const noNav = [
    "/Seller/Tour",
    "/Seller/bike",
    "/Seller/Cab",
    "/user_signup",
    "/Seller/seller",
    "/Sellermain",
    "/user_login",
    "/Seller/SellerSignup",
    "/Seller/SellerLogin",
    "/200/main",
    "/200/main/ContactForm",
    "/200/main/TourEnquiry",
  ];

  return (
    <AuthContextProvider>
      <div>
        {noNav.includes(pathname) ? null : <Navbar />}
        <Component {...pageProps} />
        {noNav.includes(pathname) ? null : <Footer />}
      </div>
    </AuthContextProvider>
  );
}

export default Myapp;
