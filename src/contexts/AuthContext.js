import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../utils/init-firebase";

import {
  // sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  // sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  startAfter,
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  limit,
  limitToLast,
  endBefore,
} from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [fireDatas, setFireData] = useState([]);
  const [currentSeller, setcurrentSeller] = useState(null);
  const router = useRouter();
  const [BikeDate, setBikeDate] = useState("");
  const [FirstVisible, setFirstVisible] = useState("");
  const [lastVisible, setlastVisible] = useState("");

  const [Nextava, setNextava] = useState(true);
  const [Prevava, setPrevava] = useState(true);
  const [Bikedays, setBikedays] = useState("");
  const [OrderDatas, setOrderDatas] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    setcurrentSeller(null);
    return signOut(auth);
  }
  function reset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  const articles = [];
  function readData() {
    router.push("/product/Cablist");

    console.log("fireData");
    // return fireData;
  }
  function readbikeData() {
    router.push("/product/bikeList");

    console.log("fireData");
    // return fireData;
  }
  function readOrderData() {
    router.push("/orderhistory");

    console.log("fireData");
    // return fireData;
  }
  async function Check(response) {
    const docRef = doc(database, "users", response.user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().Seller == false) {
        console.log("not a Seller", response.user.email);
        alert("Not Registered ");
        return signOut(auth);
      } else {
        router.push("/Seller/seller");
        setcurrentSeller(response);
        return response.user.uid;
      }
    } else {
      // console.log("not exist");
      console.log("not a Seller", response.user.email);
      alert("Not Registered ");
    }
  }
  async function SelleronlyLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((response) => {
      const Suid = response.user.uid;

      Check(response);
    });
  }
  // console.table(data[0]);

  // return ShowData(data);
  // async function ShowData(data) {
  //   router.push("/product/Cablist");
  //   // console.table(data[0]);

  //   return data;
  // }
  async function GetData(data) {
    // console.log(data.Location);
    setBikeDate(data.StartDate);

    const citiesRef = collection(database, "SellercabInfo");
    const q = query(
      citiesRef,
      where("PickLocation", "==", data.Location),
      where("CabName", "==", data.CabType),
      where("DropLocation", "==", data.DropLocation),
      where("CabAvailable", "==", true)

      // where("StartDate", "<=", data.StartDate),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setFireData(
      //   .map((data) => {
      //     return { ...data.data(), id: data.id };
      //   })
      // );
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // console.table(articles);
    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
    readData();
    // console.log(articles);

    // if (q.exists()) {
    //   // Convert to City object
    //   const city = q.data();
    //   // Use a City instance method
    //   console.log(city.toString());
    // } else {
    //   console.log("No such document!");
    // }
  }

  const bikelistSize = 6;

  async function GetPrevBikeData(data, first) {
    setNextava(true);

    // console.log("first in prev page", first.data());
    // console.log("data", data);

    const q = query(
      collection(database, "SellerBikeInfo"),
      where("Availabledate", ">=", Bikedays),
      where("CabAvailable", "==", true),
      where("PickLocation", "==", data.Location),
      where("CabName", "==", data.Cabtype),
      // where("Availabledate", "<=", 0),
      orderBy("Availabledate", "asc"),
      endBefore(first),
      limitToLast(bikelistSize + 1)
      // startAfter(first),
      // limit(3)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      setPrevava(false);

      return;
    }
    console.table("collection", querySnapshot.size);
    // console.table("first of first", first);

    const FirstVisible =
      querySnapshot.docs[querySnapshot.docs.length - bikelistSize];
    setFirstVisible(FirstVisible);
    // console.table("First prev main", FirstVisible);

    if (querySnapshot.size != 0) {
      // console.table("First prev", FirstVisible.data());
    } else {
      console.log("No More Page ");
      setPrevava(false);

      // return;
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setlastVisible(lastVisible);
    // if (lastVisible.exists()) {
    //   console.table("last", lastVisible.data());
    // }

    querySnapshot.docs.map((doc) => {
      // console.log("ok prev", doc.data());

      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // console.table(articles);
    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
  }

  async function GetNextBikeData(data, last) {
    setPrevava(true);

    // console.log("first in next", FirstVisible);

    const q = query(
      collection(database, "SellerBikeInfo"),
      where("Availabledate", ">=", Bikedays),
      // where("Availabledate", "<=", 0),
      where("CabAvailable", "==", true),
      where("PickLocation", "==", data.Location),
      where("CabName", "==", data.Cabtype),
      orderBy("Availabledate", "asc"),
      startAfter(last),
      limit(bikelistSize)
    );
    // if (q.exists()) {
    //   console.table("collection", q.size);
    // }

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      setNextava(false);

      return;
    }

    console.table("collection", querySnapshot.size);

    // if (lastVisible.exists()) {

    // if (querySnapshot.exists()) {
    //   console.table("collection", q.size);
    // }
    // console.table("next collection", querySnapshot.size);

    const FirstVisible =
      querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];
    setFirstVisible(FirstVisible);
    // console.log("First next aut out", FirstVisible.data());

    if (querySnapshot.size == 3) {
      // setNextava(false);
      // console.log("First next aut", FirstVisible.data());
    } else {
      // setFirstVisible(FirstVisible);
      // setlastVisible(lastVisible);
      console.log("No More Page ");
      setNextava(false);
      // return;
    }
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setlastVisible(lastVisible);
    // console.table("last next aut", lastVisible.data());

    querySnapshot.docs.map((doc) => {
      // console.log("ok next", doc.data());

      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // console.table(articles);

    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
  }

  async function GetBikeData(data) {
    setPrevava(false);
    // console.log(data.Location);
    // setBikeDate(data.StartDate);
    setBikedays(data.No_ofDays);
    // const citiesRef = collection(database, "SellerBikeInfo");
    const q = query(
      collection(database, "SellerBikeInfo"),
      where("Availabledate", ">=", data.No_ofDays),
      // where("Availabledate", "<=", 0),
      where("CabAvailable", "==", true),
      where("PickLocation", "==", data.Location),
      where("CabName", "==", data.Cabtype),
      orderBy("Availabledate", "asc"),
      limit(bikelistSize)
    );
    const querySnapshot = await getDocs(q);

    const FirstVisible =
      querySnapshot.docs[querySnapshot.docs.length - querySnapshot.size];
    setFirstVisible(FirstVisible);
    // console.table("First", FirstVisible);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setlastVisible(lastVisible);
    // console.table("last", lastVisible.data());

    querySnapshot.forEach((doc) => {
      // setFireData(
      //   .map((data) => {
      //     return { ...data.data(), id: data.id };
      //   })
      // );
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // console.table(articles);
    setNextava(true);

    setFireData(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
    readbikeData();
    // console.log(articles);

    // if (q.exists()) {
    //   // Convert to City object
    //   const city = q.data();
    //   // Use a City instance method
    //   console.log(city.toString());
    // } else {
    //   console.log("No such document!");
    // }
  }

  async function ReadData(data) {
    const citiesRef = collection(database, "SellerBikeInfo");
    const q = query(citiesRef, where("Location", "==", data));

    const querySnapshot = await getDocs(q);

    // await getDocs(q)
    querySnapshot.forEach((doc) => {
      // setFireData(
      //   .map((data) => {
      //     return { ...data.data(), id: data.id };
      //   })
      // );

      articles.push({
        id: doc.id,
        ...doc.data(),
      });

      // console.table(articles);
    });

    return articles;
  }

  async function ReadCustomerorder() {
    const citiesRef = collection(database, "CustomerOrder");
    const q = query(citiesRef, where("CustomerUserID", "==", currentUser.uid));

    const querySnapshot = await getDocs(q);

    // await getDocs(q)
    querySnapshot.forEach((doc) => {
      // setFireData(
      //   .map((data) => {
      //     return { ...data.data(), id: data.id };
      //   })
      // );

      articles.push({
        id: doc.id,
        ...doc.data(),
      });

      // console.table(articles);
    });

    return articles;
  }
  async function ReadCustomerorderforSeller() {
    const citiesRef = collection(database, "CustomerOrder");
    const q = query(citiesRef, where("Seller", "==", currentSeller.uid));

    const querySnapshot = await getDocs(q);

    // await getDocs(q)
    querySnapshot.forEach((doc) => {
      // setFireData(
      //   .map((data) => {
      //     return { ...data.data(), id: data.id };
      //   })
      // );

      articles.push({
        id: doc.id,
        ...doc.data(),
      });

      // console.table(articles);
    });

    return articles;
  }

  const getOrderData = async () => {
    const citiesRef = collection(database, "CustomerOrder");
    const q = query(citiesRef, where("CustomerUserID", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setOrderDatas(
      articles.map((datas) => {
        return { ...datas, id: datas.id };
      })
    );
    // setisLoding(false);
    // console.log("hello");
    readOrderData();
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
  };

  const value = {
    OrderDatas,
    getOrderData,
    Prevava,
    Nextava,
    FirstVisible,
    lastVisible,
    GetPrevBikeData,
    GetNextBikeData,
    currentUser,
    fireDatas,
    register,
    login,
    logout,
    signInWithGoogle,
    reset,
    ReadData,
    GetData,
    GetBikeData,
    readData,
    currentSeller,
    SelleronlyLogin,
    ReadCustomerorder,
    BikeDate,
    ReadCustomerorderforSeller,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
