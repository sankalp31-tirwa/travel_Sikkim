import { Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { database } from "../../src/utils/init-firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../../src/contexts/AuthContext";

function Index() {
  const { fireDatas, currentUser, BikeDate } = useAuth();
  const [fireData, setFireData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const Data = readData()
    //   .then((response) => {
    //     // setFireData(
    //     //   response.map((data) => {
    //     //     return { ...data, id: data.id };
    //     //   })
    //     // );
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error.message));
    // console.log(Data);
    // console.log("data ", BikeDate);
    console.log("data 1", fireDatas);
    console.log("data 1", fireDatas.length);

    // console.log("data 2", fireDatas[0]);
    // console.log("data 3", fireDatas[0].DropLocation);

    // fireDatas[0].DropLocation
  };

  // const [article, setArticle] = useState(null);
  // useEffect(() => {
  //   const q = collection(database, "SellercabInfo");
  //   const docRef = query(q);
  //   onSnapshot(docRef, (snapshot) => {
  //     const article = snapshot.docs.map((doc) => ({
  //       ...snapshot.data(),
  //       id: snapshot.id,
  //     }));
  //     setArticle(article);
  //     console.log(article);
  //   });
  // }, []);
  if (fireDatas.length == 0) {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Your desired vehicle is not Available at the moment. Please try
              again Later.
            </h1>
          </div>
        </section>
      </>
    );
  }
  return (
    <div className="m-8">
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium"></h3>
        <span className="mt-3 text-sm text-gray-500">Products</span>
        <div>
          {fireDatas[0].DropLocation && <h1> hello Customers</h1>}

          {fireDatas[0].DropLocation && (
            <span className="mt-3 text-sm text-gray-500">
              For Cabs From{" "}
              <span className="text-red-500 text-xs italic">
                {fireDatas[0].PickLocation}
              </span>{" "}
              To{" "}
              <span className="text-red-500 text-xs italic">
                {fireDatas[0].DropLocation}
              </span>{" "}
            </span>
          )}

          {/* {!fireDatas[0].DropLocation && <h1> hello Bikers</h1>}

          {!fireDatas[0].DropLocation && (
            <span className="mt-3 text-sm text-gray-500">
              For Bikes From{" "}
              <span class="text-red-500 text-xs italic">
                {fireDatas[0].PickLocation}
              </span>{" "}
            </span>
          )} */}
          {/* <span className="mt-3 text-sm text-gray-500">
            For Bikes From {fireDatas[0].PickLocation}{" "}
          </span> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {currentUser && (
            <>
              {fireDatas.map((product) => (
                <li key={product.id} className="flex">
                  <Link href={`/product/${product.id}`}>
                    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                      <div className="flex items-end justify-end h-56 w-full bg-cover">
                        <img
                          src={product.ImageUrl}
                          // alt={product.imageAlt}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">
                          {product.CabName}
                        </h3>
                        <span className="text-gray-500 mt-2">
                          ₹ {product.Price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}

          {!currentUser && (
            <>
              {fireDatas.map((product) => (
                <li key={product.id} className="flex">
                  <Link href={`/user_login`}>
                    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                      <div className="flex items-end justify-end h-56 w-full bg-cover">
                        <img
                          src={product.ImageUrl}
                          alt={product.imageAlt}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">
                          {product.CabType}
                        </h3>
                        <span className="text-gray-500 mt-2">
                          ₹ {product.Price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-center">
          <div className="flex rounded-md mt-8">
            {/* <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
            >
              <span>Previous</span>
            </a>

            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
            >
              <span>Next</span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
