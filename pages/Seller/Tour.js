import { useEffect, useState } from "react";
import NavBar from "../../components/Seller/NavBar";
import { useAuth } from "../../src/contexts/AuthContext";
import { database } from "../../src/utils/init-firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
// function getDate(date) {

// return newDate.toISOString();
// }

const Tour = () => {
  const { ReadCustomerorderforSeller, currentUser, currentSeller } = useAuth();
  const [fireData, setFireData] = useState([]);
  const [isLoading, setisLoding] = useState(true);
  const articles = [];
  const [Slugdata, setSlugdata] = useState();
  const CustomerDetails = [];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // getData();
  }, []);

  async function GetCustomerNumber(id) {
    // const citiesRef = collection(database, "users");
    // const q = query(citiesRef, where("Seller", "==", currentSeller.user.uid));

    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);
    console.log("User 6", id);

    if (docSnap.exists()) {
      // console.log(id);

      // console.log("Document data:", docSnap.data());
      CustomerDetails.push(docSnap.data());
      // setslugData(docSnap.data());

      // setSellerNumber(docSnap.data().phone);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
    setSlugdata(docSnap.data());
    setShowModal(true);
    // console.log("GetSellerNumber");
    // console.log(currentSeller);
    // const docRef = doc(database, "CustomerOrder", currentSeller.user.uid);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   // console.log("Document data:", docSnap.data());
    //   setSellerNumber(docSnap.data().phone);
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // console.log("Customer array");
    // console.log("Customer Data", CustomerDetails[0].phone);
    // console.log("Customer Data", Slugdata);
  }

  const getData = async () => {
    // console.log(currentSeller.user.uid);
    const citiesRef = collection(database, "CustomerOrder");
    const q = query(citiesRef, where("Seller", "==", currentSeller.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
    setisLoding(false);
    // console.log("hello");

    // console.log(fireData[0]);

    // alert("Inside");
    // const Data = ReadCustomerorderforSeller()
    //   .then((response) => {
    //     // console.table(response[0])
    //     // console.table(response);
    //     // return response;
    //     setFireData(
    //       response.map((data) => {
    //         return { ...data, id: data.id };
    //       })
    //     );
    //     setisLoding(false);
    //   })

    //   .catch((error) => console.log(error.message));
  };

  // const date = fireData[0];

  // newDate = date.getFullYear();
  // console.log(date);
  // console.log(fireData[0].Date);

  // console.table(fireData[0]);
  // console.log(fireData)

  // console.table(Data.value);
  // console.table(fireData);

  // console.log("Customer Data", Slugdata);

  if (isLoading || !currentSeller) {
    return (
      <>
        {!currentSeller && <NavBar />}

        {!currentSeller && (
          <>
            <h1>You are not Logged in</h1>
          </>
        )}
        {currentSeller && (
          <div>
            <NavBar />

            <button
              onClick={getData}
              className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {/* {currentUser.email} */}
              Click To preview
            </button>
            {/* <h1 className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                >Loading...
              </h1> */}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <NavBar />
      {!currentSeller && (
        <>
          <h1>You are not Logged in</h1>
        </>
      )}
      {/* <NavBar /> */}
      {/* <h1 className="text-center sm:text-4xl text-3xl font-bold title-font mb-2 text-gray-900">
        {currentUser && `the user :${currentUser.email}`}
      </h1> */}
      {currentSeller && (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                  {currentUser && `Order History`}
                  {!currentUser && `Login To Enjoy our services`}
                </h1>
              </div>
              <div className="w-full bg-white px-10 py-10">
                <div className="-m-4">
                  <div className="p-4 ">
                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="mt-8">
                          <div className="flow-root">
                            {currentUser && (
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {fireData.map((product) => (
                                  <>
                                    <li key={product.id} className="flex py-6">
                                      <section className="text-gray-600 body-font">
                                        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                                          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                            <img
                                              className="object-cover object-center rounded"
                                              alt="hero"
                                              src={product.ImageUrl}
                                            />
                                          </div>
                                          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                                            <h1 className="title-font sm:text-4xl text-xs mb-4 font-medium text-gray-900">
                                              {product.Cabname}
                                            </h1>
                                            <p className=" leading-relaxed">
                                              <span className="not-italic hover:italic text-lg  text-black">
                                                OrderId:{" "}
                                              </span>{" "}
                                              {product.orderId}
                                            </p>

                                            <span className="title-font ">
                                              <h1 className="text-sm text-gray-500">
                                                <span className="not-italic hover:italic text-lg  text-black">
                                                  Booked date:{" "}
                                                </span>
                                                {product.Date} {product.Time}
                                              </h1>
                                            </span>

                                            <div className="flex w-full md:justify-start justify-center items-end">
                                              <div className="">
                                                {/* <button
                                                className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                onClick={() =>
                                                  GetCustomerNumber(
                                                    product.CustomerUserID
                                                  )
                                                }
                                              >
                                                Check Customer
                                              </button> */}
                                                <>
                                                  <>
                                                    <button
                                                      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                      type="button"
                                                      onClick={() => {
                                                        GetCustomerNumber(
                                                          product.CustomerUserID
                                                        );
                                                      }}
                                                    >
                                                      Check Customer
                                                    </button>
                                                    {showModal ? (
                                                      <>
                                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                            {/*content*/}
                                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                              {/*header*/}
                                                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                <h3 className="text-3xl font-semibold">
                                                                  Customer
                                                                  Details
                                                                </h3>
                                                                <button
                                                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                  onClick={() =>
                                                                    setShowModal(
                                                                      false
                                                                    )
                                                                  }
                                                                >
                                                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                    ×
                                                                  </span>
                                                                </button>
                                                              </div>
                                                              {/*body*/}
                                                              <div className="relative p-6 flex-auto">
                                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                  <div className="relative z-0 w-full mb-6 group">
                                                                    Name:{" "}
                                                                    {
                                                                      Slugdata.name
                                                                    }
                                                                  </div>
                                                                  <div className="relative z-0 w-full mb-6 group">
                                                                    Ph Number:{" "}
                                                                    {
                                                                      Slugdata.phone
                                                                    }
                                                                  </div>
                                                                  <div className="relative z-0 w-full mb-6 group">
                                                                    Email Id:{" "}
                                                                    {
                                                                      Slugdata.email
                                                                    }
                                                                  </div>
                                                                </p>
                                                              </div>
                                                              {/*footer*/}
                                                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                <button
                                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                  type="button"
                                                                  onClick={() =>
                                                                    setShowModal(
                                                                      false
                                                                    )
                                                                  }
                                                                >
                                                                  Close
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                      </>
                                                    ) : null}
                                                  </>
                                                </>
                                              </div>
                                            </div>

                                            <span className="text-xs text-gray-600 mb-1">
                                              {product.Drop && (
                                                <span className="mt-3 text-sm text-gray-500">
                                                  From{" "}
                                                  <span className="text-red-500 text-xs italic">
                                                    {product.address}
                                                  </span>{" "}
                                                  To{" "}
                                                  <span className="text-red-500 text-xs italic">
                                                    {product.Drop}
                                                  </span>{" "}
                                                </span>
                                              )}
                                            </span>
                                            <span className="title-font font-medium">
                                              {!product.Drop && (
                                                <span className="mt-3 text-2xl text-gray-500">
                                                  From{" "}
                                                  <span className="text-red-500 text-2xl italic">
                                                    {product.address}
                                                  </span>{" "}
                                                </span>
                                              )}
                                            </span>
                                            <p className="mt-1  text-gray-500 text-2xl font-medium ">
                                              ₹ {product.Price}
                                            </p>
                                          </div>
                                        </div>
                                      </section>
                                    </li>
                                  </>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Tour;
