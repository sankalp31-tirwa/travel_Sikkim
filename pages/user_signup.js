import React, { useState } from "react";
import Link from "next/link";
import { GiSharkJaws } from "react-icons/gi";
import { CgBackspace } from "react-icons/cg";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../src/utils/init-firebase";
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

function User_signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const { register, currentUser } = useAuth();

  async function writeUserData(user) {
    const docRef = await setDoc(doc(database, "users", user.uid), user);
  }

  const signUp = (e) => {
    e.preventDefault();
    // console.log(email,password)
    if (!email || !password) {
      toast("Credentials not valid.");
      // alert("Credentials not valid.");
    }
    // setIsSubmitting(true);
    register(email, password)
      .then((response) => {
        var user = {
          Seller: false,
          name: name,
          phone: tel,
          uid: response.user.uid,
          email: response.user.email,
        };
        writeUserData(user);
        toast(response);
        toast("you have successfully signed up");
        router.push("/");
      })
      .catch((error) => toast(error.message));
  };

  return (
    <div>
      <ToastContainer />
      <Link passHref href="/">
        <div>
          <CgBackspace className="cursor-pointer h-10 w-10 m-8" />
        </div>
      </Link>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <GiSharkJaws className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up to a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href="/user_login">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  Sign-in
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Name</label>
                <input
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  id="Full-Name"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="sr-only">Ph number</label>
                <input
                  onChange={(event) => setTel(event.target.value)}
                  value={tel}
                  id="Ph-number"
                  name="Ph number"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ph number"
                />
              </div>

              <div>
                <label className="sr-only">Email address</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={signUp}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User_signup;
