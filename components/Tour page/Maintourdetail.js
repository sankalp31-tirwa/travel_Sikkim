import { useAuth } from "../../src/contexts/AuthContext";
import Link from "next/link";
import { FaPrayingHands } from "react-icons/fa";

import { database } from "../../src/utils/init-firebase";
import React, { useEffect, useState } from "react";
// import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  getDocFromCache,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Maintourdetail = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  // console.log("Start", startDate);
  // console.log("End", EndDate);

  const [No_ofAdult, setNo_ofAdult] = useState("");
  const [Children, setChildren] = useState("");
  const [No_Ofdays, setNo_Ofdays] = useState("");

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  // console.log(Message);
  const [isPreview, setisPreview] = useState(false);

  function handleAddrNo_Ofdays(e) {
    setNo_Ofdays(e.target.value);
    // console.log(No_Ofdays);
  }

  async function writeUserData(user) {
    const docRef = doc(collection(database, "TourEnquiryForm"));
    await setDoc(docRef, user)
      .then(() => {
        setisPreview(false);

        toast("Message Sent Successfully");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setNo_ofAdult("");
        setStartDate("");
        setEndDate("");
        setChildren("");
        setNo_Ofdays("");
      })
      .catch((err) => {
        setisPreview(false);

        console.error(err);
      });
  }
  async function Send(user) {
    if (
      !Children ||
      !Message ||
      !EndDate ||
      !Name ||
      !Phone ||
      !Email ||
      !No_Ofdays ||
      !startDate
    ) {
      toast("Data missing");
      return;
    }
    setisPreview(true);

    var user = {
      Time: new Date().toLocaleTimeString("en-US"),
      Date: new Date().toLocaleDateString("en-US"),
      Name: Name,
      Phone: Phone,
      Email: Email,
      No_Ofdays: No_Ofdays,
      ARRIVAL: startDate.toLocaleDateString("en-US"),
      DEPARTURE: EndDate.toLocaleDateString("en-US"),
      No_ofAdult: No_ofAdult,
      Children: Children,
      Message: Message,
    };
    writeUserData(user);
  }

  return (
    <>
      <ToastContainer />

      <div className="w-full">
        <div className="mt-7 flex flex-col px-8 shadow-lg ">
          <h1 className="text-2xl font-bold text-blue-900">
            BOOK TOUR WITH US
          </h1>
          <p className="py-3 text-lg">
            Any Tour Related Issue? Feel Free To Contact Us.
          </p>
        </div>

        <section
          className="text-gray-600 body-font z-0 "
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("https://static.toiimg.com/photo/88689758/88689758.jpg?v=3")`,
          }}
        >
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            {/* <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0"> */}
            <div className="mr-14 lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mb-14 md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">
                Welcome{" "}
              </h2>
              <div className="item-center m-auto">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/30/Large_Gautama_Buddha_statue_in_Buddha_Park_of_Ravangla%2C_Sikkim.jpg"
                  alt="Picture of the author"
                  width="368px"
                  height="547px"
                />
              </div>

              <div className="flex flex-col items-center text-center justify-center">
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              </div>
              <Link href={"checkout"}>
                <a className="flex dark:bg-black justify-end ml-3 text-gray-500">
                  {/* <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeline="round"
                    strokeli="round"
                    strokeWidth="0"
                    className="w-5 h-5 text-slate-50"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg> */}
                  <FaPrayingHands className="flex dark:text-black text-slate-50 justify-end ml-3 " />
                  {/* <img
                    src="200.jpg"
                    alt="Picture of the author"
                    width="20px "
                    height="20px "
                  /> */}
                </a>
              </Link>
            </div>{" "}
            {/* </div> */}
            {/* <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0"> */}
            <form className=" rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Full Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Your Name"
                    onChange={(event) => setName(event.target.value)}
                    value={Name}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    // id="grid-first-name"
                    type="tel"
                    placeholder="+91-"
                    onChange={(event) => setPhone(event.target.value)}
                    value={Phone}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    E-mail
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    // id="email"
                    type="email"
                    placeholder="xyz@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    value={Email}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    No of Days and Nights
                  </label>
                  <select
                    defaultValue={No_Ofdays}
                    onChange={handleAddrNo_Ofdays}
                    // id="cart-type"
                    // name="cart-type"
                    // autoComplete="country-name"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  >
                    <option value="Select">Select No. of Days/Nights</option>
                    <option value="01 Day/Night">01 Day/Nights</option>
                    <option value="02 Days/Nights">02 Days/Nights</option>
                    <option value="03 Days/Nights">03 Days/Nights</option>
                    <option value="04 Days/Nights">04 Days/Nights</option>
                    <option value="05 Days/Nights">05 Days/Nights</option>
                    <option value="06 Days/Nights">06 Days/Nights</option>
                    <option value="07 Days/Nights">07 Days/Nights</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Date of Arrival
                  </label>
                  <DatePicker
                    minDate={new Date()}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date of Departure
                  </label>
                  <DatePicker
                    minDate={new Date()}
                    selected={EndDate}
                    onChange={(date) => setEndDate(date)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    No. of Adults
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    onChange={(event) => setNo_ofAdult(event.target.value)}
                    value={No_ofAdult}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Children Below 5 yrs
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    onChange={(event) => setChildren(event.target.value)}
                    value={Children}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Message
                  </label>
                  <textarea
                    className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                    // id="message"
                    onChange={(event) => setMessage(event.target.value)}
                    value={Message}
                    placeholder="We would like to know more about your Tour Plan..."
                  ></textarea>
                  {/* <p className="text-gray-600 text-xs italic">
                        Re-size can be disabled by set by resize-none / resize-y
                        / resize-x / resize
                      </p> */}
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <button
                    className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={Send}
                  >
                    {!isPreview && `Send`}
                    {isPreview && (
                      <svg
                        role="status"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="md:w-2/3"></div>
              </div>
            </form>
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Maintourdetail;
