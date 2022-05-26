
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../utils/init-firebase";

import {
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function register(email, password) {

    // const actionCodeSettings = {
    //   url: 'https://www.example.com/?email=user@example.com',
    //   iOS: {
    //      bundleId: 'com.example.ios'
    //   },
    //   android: {
    //     packageName: 'com.example.android',
    //     installApp: true,
    //     minimumVersion: '12'
    //   },
    //   handleCodeInApp: true
    // };
    // await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
    // // Obtain emailLink from the user.
    // if(isSignInWithEmailLink(auth, emailLink)) {
    //   await signInWithEmailLink(auth, 'user@example.com', emailLink);
    // }
    


    // return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //   .then(() => {
    //     // The link was successfully sent. Inform the user.
    //     // Save the email locally so you don't need to ask the user for it again
    //     // if they open the link on the same device.
    //     window.localStorage.setItem("emailForSignIn", email);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ...
    //   });

    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // await sendEmailVerification(userCredential.user);
    // return userCredential;

    // return await createUserWithEmailAndPassword (auth,email,password)
    // .then((user) => {
    // if (user != null){
    //   user.sendEmailVerification();
    // }
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });

    return createUserWithEmailAndPassword(auth, email, password);

    // return sendEmailVerification(auth,user)
    //   .then((response) => {
    //     console.log(response);
    //     // createUserDocument(email, password, displayname);
    //   })
    //   .catch((error) => console.log(error.message));
    // return user.sendEmailVerification();
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  function reset(email) {
    return sendPasswordResetEmail(auth, email);
  }
  // function createUserDocument(email, password, displayname) {
  //   return
  // }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    signInWithGoogle,
    reset,
    // createUserDocument,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
