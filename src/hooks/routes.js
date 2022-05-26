import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

// export function withP(Component) {
//   return function WithP(props) {
//     const auth = useAuth();
//     const router = useRouter();

//     if (!auth.currentUser) {
//           {/* // return <h1>hello pRatik Loading...</h1>; */}
//           router.push("/login");
//           return <h1>hello pRatik Loading...</h1>
//     }
//     return <Component auth={auth} {...props} />;
//   };
// }

export function withAuth(WrappedComponent) {
  return function WithP(props) {
    const router = useRouter();
    const auth = useAuth();

    if (!auth.currentUser) {
      return(
      <div onClick={() => router.push("/")}>Login First
       </div>)
    }

    return <WrappedComponent {...props} />;
  };
}
