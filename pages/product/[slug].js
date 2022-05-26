import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../../src/contexts/AuthContext";
import { database } from "../../src/utils/init-firebase";
import React, { useEffect, useState } from "react";
// import firebase from "firebase";

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

// export let slugPrice = 6;
const Post = () => {
  const router = useRouter();

  var slugPrice;
  const { currentUser, fireDatas, BikeDate } = useAuth();
  // console.log("Time");
  // console.log(firebase.firestore.FieldValue.serverTimestamp());
  const [slugData, setslugData] = useState({});
  // const [SellerNumber, setSellerNumber] = useState("");

  // console.log("slugData 101");
  // console.log("cust", currentUser);
  // console.log("slugData", slugData);
  // console.log(slugData);
  // console.log(slugData);

  slugPrice = slugData.Price;
  // console.log("slugData 400");
  // console.log(slugPrice);
  // console.log("data ", BikeDate);

  // async function GetSellerNumber(slug) {
  //   console.log("GetSellerNumber");
  //   console.log(slug);

  //   const docRef = doc(database, "users", slug);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     // console.log("Document data:", docSnap.data());
  //     setSellerNumber(docSnap.data().phone);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  async function check() {
    const docRef = doc(database, "SellerBikeInfo", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().CabAvailable != true) {
        alert("Out of Stock");
        router.push("/bike");
        return;
      }
    } else {
      const docRef = doc(database, "SellercabInfo", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().CabAvailable != true) {
          alert("Out of Stock");
          router.push("/cab");
          return;
        }
      }
    }
    // const q = query(
    //   collection(database, "SellerBikeInfo", slug),
    //   where("CabAvailable", "==", true)
    // );
  }

  async function updateAD(id) {
    const docRef = doc(database, "SellercabInfo", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      updateDoc(docRef, {
        CabAvailable: false,
      })
        .then(() => {
          // alert("AD Updated");
          // getData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const docRef = doc(database, "SellerBikeInfo", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        updateDoc(docRef, {
          CabAvailable: false,
        })
          .then(() => {
            // alert("AD Updated");
            // getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  async function writeUserData(user) {
    const docRef = doc(collection(database, "CustomerOrder"));
    await setDoc(docRef, user)
      .then(() => {
        // toast("Submitted Successfully");
        // window.location.reload();
        router.push("/orderhistory");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ slugPrice }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((t) => t.json());
    console.log("Not", data);

    check();
    // GetSellerNumber(slugData.uid);

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "NE Developers Pvt Ltd",
      currency: data.currency,
      // slugPrice: 10,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for choosing Us",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYABovmmedfoIrv3zBO7mHaE0ZsacP-NFJrg&usqp=CAU",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        alert("Payment Successful");
        console.log(
          "response.razorpay_payment_id",
          response.razorpay_payment_id
        );
        console.log("response.razorpay_order_id", response.razorpay_order_id);
        console.log("response.razorpay_signature", response.razorpay_signature);

        // const myDate = new Date(Date.now());

        var user = {
          Bookingdate: BikeDate,
          Date: new Date().toLocaleDateString("en-US"),
          Time: new Date().toLocaleTimeString("en-US"),
          Seller: slugData.uid,
          // CabAvailable: false,
          SellerNumber: slugData.SellerNumber,
          Cabname: slugData.CabName,
          address: slugData.PickLocation,
          Drop: slugData.DropLocation,
          uid: slugData.uid,
          Price: slugData.Price,
          PaymentID: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          ImageUrl: slugData.ImageUrl,
          CustomerUserID: currentUser.uid,
        };
        // console.log(slugData.uid);
        // alert(slug);
        updateAD(slug);
        writeUserData(user);
      },
      // prefill: {
      //   name: "NE Developer's",
      //   email: "nedevlopers1@gmail.com",
      //   contact: "9894178970",
      // },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const Hero = ({ onClick }) => {
    return (
      <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
        {/* <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4"> */}
        <button
          onClick={onClick}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Book Now!
          </span>
        </button>
        {/* </div> */}
      </div>
    );
  };

  const [Slugdata, setSlugdata] = useState();
  const [isLoading, setisLoding] = useState(true);

  const { slug } = router.query;
  // useEffect(async (slug) => {
  //   await readData(slug);
  // }, []);

  // async function writeCartData() {
  //   var studentsClassroomRef = database
  //     .collection("users")
  //     .doc(slugData.uid)
  //     .collection("Users_cart");

  //   studentsClassroomRef
  //     .doc(slugData.id)
  //     .set({})
  //     .then(function () {
  //       console.log("Document Added ");
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }

  async function readData(slug) {
    // const citiesRef = collection(database, "SellercabInfo");
    // const q = query(citiesRef, where("Location", "==", "singtam"));
    // const querySnapshot = await getDocs(q);
    try {
      const docRef = doc(database, "SellercabInfo", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setslugData(docSnap.data());

        slugPrice = slugData.Price;
        setisLoding(false);
        // GetSellerNumber(docSnap.data().uid);
      } else {
        const docRef = doc(database, "SellerBikeInfo", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log(docSnap.data().uid);
          setslugData(docSnap.data());
          // slugPrice = slugData.Price;
          setisLoding(false);
          // GetSellerNumber(docSnap.data().uid);
        }
      }
    } catch (e) {
      console.log(e);
    }
    // setSlugdata(slugData.Price);

    // setslugData(slugData ? slugData : null);
    // const [slugData, setslugData] = useState(null);

    // console.table(Slugdata);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    // console.table(docSnap.data());
    // console.table(querySnapshot);
  }
  // console.log(Slugdata);
  // console.log("slugData.Price");
  // slugPrice = slugData.Price;
  // setSlugdata(slugPrice);
  // console.log(Slugdata);
  // console.log("slugPrice");

  // console.log(slugData.Price);
  // console.log("slugPrice:");
  // console.log(slugPrice);
  // console.log("slugPrice:");
  // console.log(Slugdata);

  // console.log("this", slugPrice);

  // console.table(slugData);
  // console.table(slugData.CabType);

  // console.log("Cechk ok", slugData);
  // const { Price } = slugData;
  // slugPrice = Price;
  // setSlugdata(slugPrice ? slugPrice : 0);
  // console.log("this is cab", slugPrice);

  if (isLoading) {
    return (
      <div>
        <button
          onClick={() => readData(slug)}
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {" "}
          Click To preview
        </button>
        {/* <h1 className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          >Loading...
        </h1> */}
      </div>
    );
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded"
              src={slugData.ImageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {/* {slug}  */}
                {slugData.CabName}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {slugData.CabName}
              </h1>
              <div className="flex mb-4">
                {/* <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span> */}
                {/* <span className="w-5 h-5 flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a> 
                </span> */}
              </div>
              <p className="leading-relaxed">
                {/* Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan. */}
                {slugData.Location}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹ {slugData.Price}
                </span>
                <button
                  // onClick={writeCartData}
                  className="flex ml-auto  border-0 py-2 px-6 rounded"
                >
                  <Hero onClick={makePayment} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// export const { Price } = slugData;
// export const { Price } = slugData;

export default Post;
