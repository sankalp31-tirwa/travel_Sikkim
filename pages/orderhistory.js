import { useEffect, useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { database } from "../src/utils/init-firebase";
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

const Orderhistory = () => {
  const { ReadCustomerorder, currentUser, OrderDatas } = useAuth();
  const [fireData, setFireData] = useState([]);
  const [isLoading, setisLoding] = useState(true);
  const articles = [];

  useEffect(() => {
    // getData();
  }, []);

  // const getData = async () => {
  //   const citiesRef = collection(database, "CustomerOrder");
  //   const q = query(citiesRef, where("CustomerUserID", "==", currentUser.uid));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     articles.push({
  //       id: doc.id,
  //       ...doc.data(),
  //     });
  //   });
  //   setFireData(
  //     articles.map((datas) => {
  //       return { ...datas, id: datas.id };
  //     })
  //   );
  //   setisLoding(false);
  // console.log("hello");

  console.log(OrderDatas[0]);
  // console.log("Inside");
  // const Data = ReadCustomerorder()
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
  // };

  // const date = fireData[0];

  // newDate = date.getFullYear();
  // console.log(date);
  // console.log(fireData[0].Date);

  // console.table(fireData[0]);
  // console.log(fireData)

  // console.table(Data.value);
  // console.table(fireData);
  // if (isLoading) {
  //   return (
  //     <div>
  //       <button
  //         onClick={getData}
  //         className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  //       >
  //         Click To preview Orders
  //       </button>
  //       {/* <h1 className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
  //         >Loading...
  //       </h1> */}
  //     </div>
  //   );
  // }
  return (
    <>
      {/* <NavBar /> */}
      {/* <h1 className="text-center sm:text-4xl text-3xl font-bold title-font mb-2 text-gray-900">
        {currentUser && `the user :${currentUser.email}`}
      </h1> */}

      <>
        <section
          className="text-gray-600 body-font z-0 "
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("https://static.toiimg.com/photo/88689758/88689758.jpg?v=3")`,
          }}
        >
          {" "}
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                {currentUser && `Booking History`}
                {!currentUser && `Login To Enjoy our services`}
              </h1>
            </div>
            <div className="w-full bg-white">
              <div className="">
                <div className=" ">
                  <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="mt-8">
                        {currentUser && (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {" "}
                            {OrderDatas.map((product) => (
                              <section
                                key={product.id}
                                className="text-gray-600 body-font"
                              >
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

                                    {/* <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                <label
                  for="hero-field"
                  className="leading-7 text-sm text-gray-600"
                >
                  Placeholder
                </label>
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
            </div> */}
                                    <p className="text-sm mt-1 text-gray-500 w-full">
                                      <div className="flex flex-col ">
                                        {product.Drop && (
                                          <>
                                            <p className="not-italic hover:italic text-lg  text-black">
                                              Seller Number:
                                            </p>
                                          </>
                                        )}
                                        {!product.Drop && (
                                          <>
                                            <p className="not-italic hover:italic text-lg  text-black">
                                              Renter Number:
                                            </p>
                                          </>
                                        )}
                                        {product.SellerNumber}
                                      </div>
                                    </p>

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
        </section>
      </>
    </>
  );
};

export default Orderhistory;
