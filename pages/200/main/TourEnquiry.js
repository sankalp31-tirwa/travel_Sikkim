import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../../../src/contexts/AuthContext";
import { database } from "../../../src/utils/init-firebase";
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
} from "firebase/firestore";
const TourEnquiry = () => {
  const articles = [];
  const [fireDatas, setFireData] = useState([]);
  const [isLoading, setisLoding] = useState(true);

  const waitData = async () => {
    setisLoding(false);
  };

  const getData = async () => {
    console.log("not");

    const querySnapshot = await getDocs(
      collection(database, "TourEnquiryForm")
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
      console.log(fireDatas[0]);
    });

    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
    waitData();
    console.log(articles);
    console.log(articles[0]);
  };

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, "TourEnquiryForm", id);
    deleteDoc(fieldToEdit)
      .then(() => {
        toast("Cab Details Removed Successfully");
        getData();
      })
      .catch((err) => {
        toast("Cannot Delete that field..");
      });
  };

  if (isLoading) {
    return (
      <div>
        <button
          onClick={getData}
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Click To preview
        </button>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />

      <section className="text-gray-600 body-font overflow-hidden bg-white rounded-lg">
        <div className=" rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            Traveler Details
          </h2>
          {fireDatas.map((product, index) => {
            return (
              <div key={index} className="container px-5 py-24 mx-auto">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  Date: {product.Date} Time :{product.Time}
                </h2>
                <div className="-my-8 divide-y-2 divide-gray-100">
                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="mt-1 text-gray-500 text-sm">
                        Full Name: {product.Name}
                      </span>

                      <span className="mt-1 text-gray-500 text-sm">
                        Ph Number: {product.Phone}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        Email: {product.Email}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        NO. OF ADULTS: {product.No_ofAdult}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        CHILDREN BELOW 5 YRS: {product.Children}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        NO OF DAYS AND NIGHTS: {product.No_Ofdays}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        {/* DATE OF ARRIVAL: {product.ARRIVAL} */}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        {/* DATE OF DEPARTURE: {product.DEPARTURE} */}
                      </span>
                    </div>

                    <div className="md:flex-grow">
                      <p className="leading-relaxed flex flex-col">
                        <span className="font-semibold title-font text-gray-700">
                          Message
                        </span>
                        {product.Message}
                      </p>
                      <a className="text-indigo-500 inline-flex items-center mt-4">
                        <button onClick={() => deleteDocument(product.id)}>
                          Delete
                        </button>
                      </a>
                    </div>
                  </div>
                  <span className="inline-block h-1 w-full rounded bg-indigo-500 mt-8 mb-6"></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TourEnquiry;
