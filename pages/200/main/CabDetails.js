import { useState, useEffect } from "react";
// import NavBar from "../../components/Seller/NavBar";
//Yes Sankalp
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
  const [CabName, setCabName] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);
  const articles = [];
  const BookingDates = [];
  const [isLoading, setisLoding] = useState(false);

  useEffect(() => {
    // getData();
  }, []);

  async function writeUserData(data) {
    const docRef = doc(collection(database, "SellerCabImage"));
    await setDoc(docRef, data)
      .then(() => {
        toast("Data Sent");
        setisLoding(false);

        getData();
        // window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getData = async () => {
    const citiesRef = collection(database, "SellerCabImage");
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
    if (!imageUpload || !CabName) {
      toast("Data missing");
      return;
    }
    setisLoding(true);

    const iname = imageUpload.name + v4();
    setimageName(iname);
    // console.log("image", imageName);
    const imageRef = ref(storage, `SellerCabImages/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        var data = {
          // imageName: imageName,
          //   uid: currentUser.uid,
          ImageUrl: url,
          CabName: CabName,
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
    const desertRef = ref(storage, `SellerCabImages/${imageName}`);
    console.table(imageName);
    deleteObject(desertRef)
      .then((res) => {
        toast(res);
      })
      .catch((error) => {
        toast(error.message);
      });
    let fieldToEdit = doc(database, "SellerCabImage", id);
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
                      Cab Name
                    </span>
                  </div>
                  <div className="flex-grow">
                    <input
                      className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      id="Money"
                      type="text"
                      value={CabName}
                      onChange={(event) => setCabName(event.target.value)}
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

              <div>
                <button
                  onClick={uploadFile}
                  className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {!isLoading && `Submit`}
                  {isLoading && (
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
                        <p className="ml-4 "> {product.CabName}</p>
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
