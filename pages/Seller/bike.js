import { useState, useEffect } from "react";
import NavBar from "../../components/Seller/NavBar";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { storage, database } from "../../src/utils/init-firebase";
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
import { reload } from "firebase/auth";
import {
  collection,
  getDoc,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../../src/contexts/AuthContext";

function Bike() {
  const storage = getStorage();

  const elements = ["1"];
  // , "2", "3", "4", "5"];
  const { currentUser, currentSeller } = useAuth();

  const [dates, setDates] = useState([new Date()]);
  const [imageUpload, setImageUpload] = useState("");
  const [imageName, setimageName] = useState("");
  const [CabName, setCabName] = useState("");
  const [Location, setLocation] = useState("");
  const [url, seturl] = useState("");
  const [price, setprice] = useState(null);
  const [availabledate, setavailabledate] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);
  const [fireData, setFireData] = useState([]);
  const articles = [];
  const [isLoading, setisLoding] = useState(false);
  const [isPreview, setisPreview] = useState(false);
  const [Ad, setAD] = useState(false);
  const [SellerNumber, setSellerNumber] = useState("");

  const car = {
    Default: "",
    RoyalEnfieldMeteor350:
      "https://images.carandbike.com/bike-images/large/royal-enfield/meteor-350/royal-enfield-meteor-350.webp?v=15",
    RoyalEnfieldBullet350:
      "https://images.carandbike.com/bike-images/colors/royal-enfield/bullet-350/royal-enfield-bullet-350-bullet-silver.webp?v=31",
    RoyalEnfieldHimalayan:
      "https://images.carandbike.com/bike-images/colors/royal-enfield/himalayan/royal-enfield-himalayan-gravel-grey.webp?v=30",
    HeroXPulse200:
      "https://images.carandbike.com/bike-images/colors/hero/xpulse-200/hero-xpulse-200-pearl-fadeless-white.webp?v=10",
  };
  const s = car[CabName];

  async function GetSellerNumber() {
    // console.log("GetSellerNumber");
    // console.log(currentSeller);

    const docRef = doc(database, "users", currentSeller.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setSellerNumber(docSnap.data().phone);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const closePreview = () => {
    setisPreview(false);
  };
  useEffect(() => {
    // getData();
  }, []);

  console.table(dates);
  // console.log(dates.values);
  // console.log(currentUser.uid);
  function handleAddrTypeChange(e) {
    setCabName(e.target.value);
  }
  function handlesetLocation(e) {
    setLocation(e.target.value);
    console.log(Location);
    GetSellerNumber();
  }

  // const [imageUrls, setImageUrls] = useState([]);

  // console.log(imageUpload);
  // const uploadFile = () => {

  //   if (imageUpload == null) return;

  //   const imageRef = ref(storage, `Cabimages/${imageUpload.name + v4()}`);

  //   uploadBytes(imageRef, imageUpload).then(() => {
  //     alert("image uploaded");
  //     setImageUpload("");
  //   });
  // };
  // async function writeUserData(data) {
  //   const docRef = await setDoc(doc(database, "SellercabInfo",), data);
  // }
  async function writeUserData(data) {
    // const docRef = await setDoc(doc(database, "SellercabInfo",), data);
    const docRef = doc(collection(database, "SellerBikeInfo"));
    await setDoc(docRef, data)
      .then(() => {
        toast("Bike Details Has been Submitted Successfully");
        // console.log(url);
        // setCabName("");
        // setLocation("");
        setprice("");
        setavailabledate("");
        getData();
        // setCabtype("");
        // setLocation("");
        // window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
    setisLoding(false);
  }

  const getData = async () => {
    const citiesRef = collection(database, "SellerBikeInfo");
    const q = query(citiesRef, where("uid", "==", currentUser.uid));
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
    // setisLoding(false);
    setisPreview(true);

    console.table("hello ", fireData[0]);
  };

  const uploadFile = () => {
    if (!s || !Location || !price || !availabledate || !CabName) {
      toast("Data missing");
      return;
    }
    setisLoding(true);

    var data = {
      CabAvailable: true,

      uid: currentUser.uid,
      ImageUrl: s,
      CabName: CabName,
      DropLocation: false,
      PickLocation: Location,
      Price: Number(price),
      Availabledate: Number(availabledate),
      SellerNumber: SellerNumber,

      // cars: ["Ford", "Tata"],
      // Date: dates,
      // email: response.user.email,
    };

    writeUserData(data);
    // console.table(imageUrls);
    console.table(url);
    // console.log(imageUrls);
    // alert("image uploaded");
  };

  // const updateImageFile = () => {
  //   const imageRef = ref(
  //     storage,
  //     `SellerBikeimages/${imageUpload.name + v4()}`
  //   );
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       console.log(url);
  //       return url;
  //       toast("image Updated");

  //     });
  //   });
  // }
  // var url = updateImageFile();
  // seturl(url);

  // console.log(url)

  const updateFields = (id) => {
    if (!s || !Location || !CabName) {
      toast("Data missing BikeName or Loaction");
      return;
    }
    let fieldToEdit = doc(database, "SellerBikeInfo", id);
    // if (imageUpload) {
    // toast("Image Cannot Be updated");
    // }
    // const url = updateImageFile();
    updateDoc(fieldToEdit, {
      // ImageUrl: url,
      ImageUrl: s,
      CabName: CabName,
      PickLocation: Location,
      Price: Number(price),
      // Availabledate: Number(availabledate),
    })
      .then(() => {
        toast("Data Updated");
        getData();
        setprice("");
        setavailabledate("");
        // setDates([new Date()]);
        // setImageUpload("");
        // setLocation("");
        // setprice(null);
        // setavailabledate(null);
        // setIsUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAD = (id) => {
    let fieldToEdit = doc(database, "SellerBikeInfo", id);
    updateDoc(fieldToEdit, {
      CabAvailable: Ad,
    })
      .then(() => {
        alert("AD Updated");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    // const desertRef = ref(storage, `SellerBikeimages/${imageName}`);
    // console.table(imageName);
    // console.log(fireData[0].imageName);
    // console.log(fireData.id);
    // console.log("id.imageName");
    // console.log(id.Location);
    // deleteObject(desertRef)
    // .then((res) => {
    // toast(res);
    // })
    // .catch((error) => {
    // toast(error.message);
    // });
    let fieldToEdit = doc(database, "SellerBikeInfo", id);
    deleteDoc(fieldToEdit)
      .then(() => {
        toast("Bike Details Removed Successfully");
        getData();
      })
      .catch((err) => {
        toast("Cannot Delete that field..");
      });
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      {!currentSeller && (
        <>
          <h1>You are not Logged in</h1>
        </>
      )}
      {currentSeller && (
        <>
          {/* {currentSeller && ( */}
          {/* <> */}
          {/* <h1>welcomejnv</h1> */}
          {/* </> */}
          {/* )} */}
          {/* <div className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <p>Click the button to add a new element to the array.</p>
        <button onClick={myFunction}>Click</button>
      </div> */}
          <h1 className="text-center sm:text-4xl text-3xl font-bold title-font mb-2 text-gray-900">
            Bike Rental
          </h1>

          {/* {elements.map((value, index) => {
        return ( */}
          <>
            <section
              // key={index}
              className="text-gray-600 body-font overflow-hidden"
            >
              <div className="container px-5 py-8 mx-auto border mt-6 border-gray-300">
                <div className="-my-8 divide-y-2 divide-gray-100 ">
                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        Bike name
                      </span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <select
                            defaultValue={CabName}
                            onChange={handleAddrTypeChange}
                            id="car type"
                            name="car type"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option selected value="">
                              Select Bike
                            </option>
                            <option value="RoyalEnfieldMeteor350">
                              Royal Enfield Meteor 350
                            </option>
                            <option value="RoyalEnfieldBullet350">
                              Royal Enfield Bullet 350
                            </option>
                            <option value="RoyalEnfieldHimalayan">
                              Royal Enfield Himalayan
                            </option>
                            <option value="HeroXPulse200">
                              Hero XPulse 200
                            </option>
                            {/* <option value="Alto">Alto</option> */}
                          </select>
                        </div>
                        {/* <div className="w-full md:w-1/2 px-3">
                          <button
                            // onClick={getImageUrl}
                            className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          >
                            Add To Data{" "}
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        Select your Location
                      </span>
                    </div>
                    <div className="flex-grow">
                      <select
                        defaultValue={Location}
                        onChange={handlesetLocation}
                        // id="countries"
                        className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option selected value="">
                          Select your location
                        </option>
                        <option value="Gangtok">Gangtok</option>
                        {/* <option value="Namchi">Namchi</option> */}
                        <option value="Bagdogra Airport">
                          Bagdogra Airport
                        </option>
                        <option value="Siliguri/NJP">Siliguri/NJP</option>
                        {/* <option value="Melli">Melli</option>
                    <option value="Rangpo">Rangpo</option>
                    <option value="Singtam">Singtam</option>
                    <option value="32nd Mile">32nd Mile</option>
                    <option value="Chitrey">Chitrey</option>
                    <option value="Coronation Bridge">Coronation Bridge</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        Choose Available Dates
                      </span>
                    </div>
                    <div className="flex-grow">
                      <div className="grid grid-flow-row">
                        <div className="grid grid-cols-2 gap-8">
                          <div className="|| overflow-hidden mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <DatePicker
                              minDate={new Date()}
                              value={dates}
                              selected={dates}
                              onChange={setDates}
                              format="DD MMMM YYYY"
                              multiple
                              plugins={[<DatePanel key={dates} />]}
                            />
                          </div>

                          <div className="flex-grow">
                            <input
                              className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              // id="Money"
                              placeholder="No. of days"
                              type="number"
                              value={availabledate}
                              onChange={(event) =>
                                setavailabledate(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        Price in Rs.
                      </span>
                    </div>
                    <div className="flex-grow">
                      <input
                        className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="Money"
                        type="number"
                        value={price}
                        onChange={(event) => setprice(event.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="py-8 flex flex-wrap md:flex-nowrap">
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
                        // value={imageUpload}
                      />
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Image
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* {isUpdate ? (
                  <button
                    onClick={updateFields}
                    className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    UPDATE
                  </button>
                ) : ( */}
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
                {/* )} */}
              </div>

              {/* <button onClick={() => setShow(prev => !prev)}>Click</button>
        {show && <Serviceprovided />} */}
            </section>
          </>

          {/* );
      })} */}
          <div>
            {!isPreview && (
              <button
                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={updateImageFile}
                onClick={getData}
              >
                Click To preview
              </button>
            )}
            {isPreview && (
              <>
                {" "}
                <button
                  className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  // onClick={updateImageFile}
                  onClick={closePreview}
                >
                  Close
                </button>
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {fireData.map((product) => (
                      <li key={product.id} className="flex py-6">
                        {/* <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"> */}
                        <div className="md:h-28 md:w-28 h-16 w-16 rounded-md border border-gray-200">
                          <img
                            src={product.ImageUrl}
                            // alt={product.imageAlt}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <>
                                <h3>{product.CabAvailable && `AD Enabled`}</h3>
                                <h3>
                                  {!product.CabAvailable && `AD Disabled`}
                                </h3>
                              </>
                              <p className="ml-4 ">₹ {product.Price}.00</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.CabType}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <>
                              <div className="flex justify-center">
                                <div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      type="radio"
                                      value={true}
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                      onClick={() => setAD(true)}
                                    />
                                    <label
                                      className="form-check-label inline-block text-gray-800"
                                      htmlFor="flexRadioDefault1"
                                    >
                                      enable AD
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      type="radio"
                                      value={false}
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      onClick={() => setAD(false)}
                                      // checked
                                    />
                                    <label
                                      className="form-check-label inline-block text-gray-800"
                                      htmlFor="flexRadioDefault2"
                                    >
                                      disable AD
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <button
                                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                onClick={() => updateAD(product.id)}
                              >
                                Update AD
                              </button>
                            </>

                            <p className="text-gray-500">
                              {/* <h3>Your  Unique Account ID: {product.uid}</h3> */}
                              <h3>Product ListId: {product.id}</h3>
                              <p>Loaction: {product.Location}</p>
                              {/* From {data.destination} To {data.destination2} */}
                            </p>

                            <div className="grid grid-cols-1 ">
                              <button
                                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                onClick={() => deleteDocument(product.id)}
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
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Bike;
