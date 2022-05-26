import { useState, useEffect } from "react";
// import NavBar from "../../components/Seller/NavBar";
import { storage, database } from "../../../src/utils/init-firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
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
import { useAuth } from "../../../src/contexts/AuthContext";

function Home() {
  const storage = getStorage();

  const elements = ["1"];
  const { currentUser } = useAuth();

  const [imageUpload, setImageUpload] = useState("");
  const [imageName, setimageName] = useState("");
  const [url, seturl] = useState("");
  const [BikeName, setBikeName] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);
  const articles = [];
  const BookingDates = [];
  const [isLoading, setisLoding] = useState(true);

  useEffect(() => {
    // getData();
  }, []);

  async function writeUserData(data) {
    const docRef = doc(collection(database, "SellerBikeImage"));
    await setDoc(docRef, data)
      .then(() => {
        toast("Data Sent");
        getData();
        // window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getData = async () => {
    const citiesRef = collection(database, "SellerBikeImage");
    // const q = query(citiesRef, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(citiesRef);
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

    console.table("hello ", fireData[0]);
  };

  const uploadFile = () => {
    if (!imageUpload || !BikeName) {
      toast("Data missing");
      return;
    }
    const iname = imageUpload.name + v4();
    setimageName(iname);
    // console.log("image", imageName);
    const imageRef = ref(storage, `SellerBikeimages/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        var data = {
          // imageName: imageName,
          //   uid: currentUser.uid,
          ImageUrl: url,
          BikeName: BikeName,
          //   cars: ["dates"],
          // Date: dates,
          // email: response.user.email,
        };
        seturl(url);
        writeUserData(data);
        // console.table(imageUrls);
        console.table(url);
        // console.log(imageUrls);
        // alert("image uploaded");
      });
    });
  };

  const deleteDocument = (id, imageName) => {
    const desertRef = ref(storage, `SellerBikeimages/${imageName}`);
    console.table(imageName);
    deleteObject(desertRef)
      .then((res) => {
        toast(res);
      })
      .catch((error) => {
        toast(error.message);
      });
    let fieldToEdit = doc(database, "SellerBikeImage", id);
    deleteDoc(fieldToEdit)
      .then(() => {
        toast("Data Deleted");
        getData();
      })
      .catch((err) => {
        toast("Cannot Delete that field..");
      });
  };

  return (
    <>
      <ToastContainer />
      {/* <NavBar /> */}
      <>
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-8 mx-auto border mt-6 border-gray-300">
              <div className="-my-8 divide-y-2 divide-gray-100 ">
                <div className="py-8 flex flex-wrap md:flex-nowrap"></div>

                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      Bike Name
                    </span>
                  </div>
                  <div className="flex-grow">
                    <input
                      className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      id="Money"
                      type="text"
                      value={BikeName}
                      onChange={(event) => setBikeName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      Upload Bike image
                    </span>
                  </div>
                  <div className="flex-grow">
                    <input
                      className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      aria-describedby="user_avatar_help"
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      Image
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={uploadFile}
                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Submit
              </button>
            </div>
          </section>
        </>

        <div>
          <button
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={getData}
          >
            {" "}
            Click To preview{" "}
          </button>
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {fireData.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="md:h-28 md:w-28 h-16 w-16 rounded-md border border-gray-200">
                    <img
                      src={product.ImageUrl}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{/* <a href={product.href}> {data.id} </a> */}</h3>
                        <p className="ml-4 ">Bike Name: {product.BikeName}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.CabType}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        {/* <h3>Your UniqueID: {product.uid}</h3> */}
                        <h3>Product ListId: {product.id}</h3>
                        {/* <p>Loaction: {product.Location}</p> */}
                      </p>

                      <div className="grid grid-cols-1 ">
                        <button
                          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          onClick={() =>
                            deleteDocument(product.id, product.imageName)
                          }
                        >
                          Delete
                        </button>

                        <button
                          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          onClick={() => updateFields(product.id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
