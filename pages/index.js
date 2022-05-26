import Head from "next/head";
import Image from "next/image";
// import Button from '@mui/material/Button';
{
  /* <Button className="bg-black" variant="contained">Contained</Button> */
}

import Main from "../components/Main landing page/Main";
import Imageslider from "../components/Main landing page/Imageslider";
import ContactUs from "../components/Main landing page/ContactUs";
import Details from "../components/Main landing page/Details";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel with Us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/slogo.jpeg" />
      </Head>

      <Imageslider />
      <Details />
      <Main />
      <ContactUs />
    </>
  );
}