import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlinePhone } from "react-icons/ai";
import { GiSharkJaws } from "react-icons/gi";
import Image from "next/image";
import { CgBackspace } from "react-icons/cg";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User_login() {
  const router = useRouter();
  const { login, currentUser, signInWithGoogle, reset } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  const signUpWithGoogle = () => {
    // e.preventDefault();
    // console.log(email,password)
    // if (!email || !password) {
    // toast({
    //   description: 'Credentials not valid.',
    //   status: 'error',
    //   duration: 9000,
    //   isClosable: true,
    // })
    //   alert("Credentials not valid.");
    // }
    // setIsSubmitting(true);
    signInWithGoogle()
      .then((user) => {
        router.push("/");
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  const UserPasswordReset = (e) => {
    e.preventDefault();
    // toast("Please Write The Email There");
    // console.log("okokok");

    if (!email) {
      toast("Please Write The Email There");
    }

    reset(email)
      .then(() => {
        toast("Please Check Your Mail");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const Userlogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Credentials not valid.");
      // alert("Credentials not valid.");
    }
    login(email, password)
      .then((response) => {
        router.push("/");
        console.table(response);
      })
      .catch((error) => toast(error.code));
  };

  return (
    <>
      <ToastContainer />
      {/* <Link passHref href="/"> */}
      <a onClick={() => router.back()}>
        <CgBackspace className="cursor-pointer h-10 w-10 m-8" />
      </a>
      {/* </Link> */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <GiSharkJaws className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link passHref href="/user_signup">
                <p className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                  Sign-up
                </p>
              </Link>
            </div>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <button onClick={UserPasswordReset}>
                    Forgot your password?
                  </button>
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={Userlogin}
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
                Sign in
              </button>
            </div>
          </form>
          <hr className=""></hr>

          <div className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <div
              onClick={signUpWithGoogle}
              className="cursor-pointer items-center mr-8  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FcGoogle className="mr-4 " /> Google
            </div>

            {/* <div className="cursor-pointer items-center w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <AiOutlinePhone className="mr-4" /> Ph Number
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default User_login;
