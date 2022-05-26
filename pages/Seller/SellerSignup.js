import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../../src/utils/init-firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Sellermain() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [location, setLoaction] = useState("");
  const { register, currentUser } = useAuth();

  async function writeUserData(user) {
    // const docRef = await addDoc(collection(database, 'users' ), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    //   type: "seller",
    //   name: "Raja",
    //   phone: "779797329",
    //   address: "474 Mercer Drive",
    //   uid: user.uid,
    //   email: user.email,
    // }).doc(`users/${user.uid}`);
    // console.log("Document written with ID: ", docRef.id);

    const docRef = await setDoc(doc(database, "users", user.uid), user);

    // database.collection("user").doc("uid").set({
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    //   type: "seller",
    //   name: "Raja",
    //   phone: "779797329",
    //   address: "474 Mercer Drive",
    //   uid: response.uid,
    //   email: response.email,
    // });
  }
  //   function writeUserData(user) {
  //     firebase.database().ref('users/' + user.uid).set(user).catch(error => {
  //         console.log(error.message)
  //     });
  // }
  const signUp = (e) => {
    e.preventDefault();
    // console.log(email,password)
    if (!email || !password || !name) {
      toast("Credentials not valid.");
      // alert("Credentials not valid.");
    }
    // setIsSubmitting(true);
    const user = register(email, password)
      .then((response) => {
        // console.table(response.user);
        // console.log(response.user.uid);
        var user = {
          Seller: true,
          name: name,
          phone: tel,
          address: location,
          uid: response.user.uid,
          email: response.user.email,
        };
        writeUserData(user);
        toast(response);
        toast("you have successfully signed up");
        router.push("/Seller/seller");
      })
      .catch((error) => toast(error.message));
  };

  return (
    <>
      <ToastContainer />

      <div className="bg-grey-lighter my-48">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <input
              type="tel"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="Ph number"
              placeholder="Ph number"
              onChange={(event) => setTel(event.target.value)}
              value={tel}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="location"
              placeholder="location"
              onChange={(event) => setLoaction(event.target.value)}
              value={location}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />

            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            {/* <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
            /> */}

            <button
              onClick={signUp}
              type="submit"
              className="border-4 border-black w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="text-grey-dark mt-6">
              <a className="no-underline border-b border-blue text-blue">
                Already have an account?{" "}
                <Link href="/Seller/SellerLogin">Login</Link>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex-shrink-0  mt-2 border-t-2 border-black">
        <Link passHref href="/">
          <h2 className="h-16 w-full flex justify-center py-2 px-4 font-medium  text-white bg-pink-600 hover:bg-pink-700">
            Go Back to Home Page
          </h2>
        </Link>
      </footer>
    </>
  );
}

export default Sellermain;
