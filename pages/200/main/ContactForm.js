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

const ContactForm = () => {
  const articles = [];
  const [fireDatas, setFireData] = useState([]);
  const [isLoading, setisLoding] = useState(true);

  const waitData = async () => {
    setisLoding(false);
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(database, "ContactUSForm"));
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
  const [isPreview, setisPreview] = useState(false);

  const deleteDocument = (id) => {
    setisPreview(true);
    let fieldToEdit = doc(database, "ContactUSForm", id);
    deleteDoc(fieldToEdit)
      .then(() => {
        setisPreview(false);

        toast("Cab Details Removed Successfully");
        getData();
      })
      .catch((err) => {
        setisPreview(false);

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
            Contact Us Details List
          </h2>
          {fireDatas.map((product, index) => {
            return (
              <div key={index} className="container px-5 py-24 mx-auto">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  Date: {product.Date} Time: {product.Time}
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
                    </div>

                    <div className="md:flex-grow">
                      <p className="leading-relaxed flex flex-col">
                        <span className="font-semibold title-font text-gray-700">
                          Message
                        </span>
                        {product.Message}
                      </p>
                      <a className="mx-auto border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg || text-indigo-500 inline-flex items-center mt-4">
                        <button onClick={() => deleteDocument(product.id)}>
                          {!isPreview && `Delete`}
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

export default ContactForm;
