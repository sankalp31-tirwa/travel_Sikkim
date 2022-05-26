import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useAuth } from "../../src/contexts/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function Choosebike() {
  const { currentUser, GetBikeData } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [Location, setLocation] = useState("");
  const [No_ofDays, setNo_ofDays] = useState("");
  const [Time, setTime] = useState(null);
  const [Cabtype, setCabtype] = useState("Default");

  const car = {
    Default:
      "https://st.depositphotos.com/1887105/1782/v/450/depositphotos_17828493-stock-illustration-black-motorcycle-with-red-flame.jpg",
    RoyalEnfieldMeteor350:
      "https://images.carandbike.com/bike-images/large/royal-enfield/meteor-350/royal-enfield-meteor-350.webp?v=15",
    RoyalEnfieldBullet350:
      "https://images.carandbike.com/bike-images/colors/royal-enfield/bullet-350/royal-enfield-bullet-350-bullet-silver.webp?v=31",
    RoyalEnfieldHimalayan:
      "https://images.carandbike.com/bike-images/colors/royal-enfield/himalayan/royal-enfield-himalayan-gravel-grey.webp?v=30",
    HeroXPulse200:
      "https://images.carandbike.com/bike-images/colors/hero/xpulse-200/hero-xpulse-200-pearl-fadeless-white.webp?v=10",
  };
  const s = car[Cabtype];

  const uploadFile = () => {
    if (Cabtype === "Default" || !Location || !No_ofDays) {
      toast("Data missing");
      return;
    }
    var data = {
      Cabtype: Cabtype,
      No_ofDays: Number(No_ofDays),

      Location: Location,
      StartDate: startDate.toLocaleDateString("en-US"),
    };
    // alert("submited");
    // console.log(data);
    GetBikeData(data);
  };

  // console.log(Cabtype);
  function handlesetLocation(e) {
    setLocation(e.target.value);
    // console.log(Location);
  }
  function handlesetTime(e) {
    setTime(e.target.value);
    // console.log(Time);
  }
  function handleAddrTypeChange(e) {
    setCabtype(e.target.value);
    // console.log(Cabtype);
  }
  return (
    <>
      <ToastContainer />

      <div className="flex justify-center p-4 hover:animate-pulse	">
        <img
          alt="Cab images"
          className="object-contain top rounded-lg w-5/6 sm:h-96 h-40"
          // style={{ width: "100%" }}
          src={s}
        />
      </div>
      <div className="mx-10 mt-5 md:col-span-2">
        {/* <form onSubmit={uploadFile} action="#" method="POST"> */}

        <div className="sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="col-span-6 py-2 sm:col-span-3">
              <label
                htmlFor="country"
                className="text-center block text-bold font-bold text-gray-700"
              >
                CHOOSE A Bike
              </label>
              <select
                defaultValue={Cabtype}
                onChange={handleAddrTypeChange}
                id="car type"
                name="car type"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Default">Select Bike</option>
                <option value="RoyalEnfieldMeteor350">
                  Royal Enfield Meteor 350
                </option>
                <option value="RoyalEnfieldBullet350">
                  Royal Enfield Bullet 350
                </option>
                <option value="RoyalEnfieldHimalayan">
                  Royal Enfield Himalayan
                </option>
                <option value="HeroXPulse200">Hero XPulse 200</option>
                {/* <option value="Alto">Alto</option> */}
              </select>
            </div>

            <div className="mt-10 grid">
              <div className="grid grid-flow-row">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pick-up Location
                      </label>
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
                  <div className="relative z-0 mb-6 w-full group">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        No of Days
                      </label>
                      <input
                        type="number"
                        value={No_ofDays}
                        onChange={(event) => setNo_ofDays(event.target.value)}
                        className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></input>
                    </div>{" "}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pick-up Time
                      </label>
                      <select
                        defaultValue={Time}
                        onChange={handlesetTime}
                        className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {/* <option value="00:00">00:00 </option>
                        <option value="01:00">01:00 </option>
                        <option value="02:00 ">02:00 </option>
                        <option value="03:00 ">03:00 </option>
                        <option value="04:00">04:00 </option>
                        <option value="05:00">05:00 </option>
                        <option value="06:00">06:00 </option>
                        <option value="07:00 ">07:00 </option> */}
                        <option value="08:00">08:00 </option>
                        <option value="09:00">09:00 </option>
                        <option value="10:00">10:00 </option>
                        <option value="11:00">11:00 </option>
                        <option value="12:00">12:00 </option>
                        <option value="13:00">13:00 </option>
                        <option value="14:00 ">14:00 </option>
                        <option value="15:00">15:00 </option>
                        <option value="16:00">16:00 </option>
                        <option value="17:00 ">17:00 </option>
                        <option value="18:00">18:00 </option>
                        <option value="19:00">19:00 </option>
                        <option value="20:00">20:00 </option>
                        {/* <option value="21:00 ">21:00 </option>
                        <option value="22:00">22:00 </option>
                        <option value="23:00">23:00 </option>
                        <option value="24:00">24:00 </option> */}
                      </select>
                    </div>
                  </div>

                  <div className="relative z-0 mb-6 w-full group">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pick-up Date
                      </label>
                      {/*
                        for submitting 
                        https://www.javatpoint.com/react-date-picker */}
                      <DatePicker
                        minDate={new Date()}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="|| mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3  text-right sm:px-6">
            <button
              onClick={uploadFile}
              className="flex mx-auto text-white bg-gray-900 border-2 border-white py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Continue Booking
            </button>
            {/* {!currentUser && (
                <Link passHref href="/user_login">

                <button
                  className="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 rounded text-lg"
                >
                  Login to Continue
                </button>
                </Link>
              )} */}
          </div>
        </div>
        {/* </form> */}
      </div>
    </>
  );
}

export default Choosebike;
