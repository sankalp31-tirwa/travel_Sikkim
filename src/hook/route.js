// import { useRouter } from "next/router";
// import React,{useEffect} from "react";
// import { useAuth } from "../contexts/AuthContext";

// export function withPublic(Component) {
//   return function WithPublic(props) {
//     const auth = useAuth();
//     const router = useRouter();

//     if (auth.currentUser) {
//       // return <h1>hello pRatik Loading...</h1>;
//       router.replace("/");
//       return <h1>hello pRatik Loading...</h1>;
//     }
//     // useEffect(() => {
//     //   if(auth.currentUser){
//     //     router.push("/");
//     //   }
    
//     // }, [auth.currentUser])
//     return <Component auth={auth} {...props} />;
//   };
// }

// // import { useRouter } from "next/router";
// export function withProtected(Component) {
//   return function WithProtected(props) {
//     const auth = useAuth();
//     const router = useRouter();
//     useEffect(() => {
//       if(!auth.currentUser){
//         router.push("/login");
//       }
    
//     }, [auth.currentUser])
//     // if (!auth.currentUser) {
      
//     //     return <div onClick={() => router.push("/login")}>Login First</div>;
//     //     <h1>hello pRatik Loading...</h1>;
//     // }
    
//     return <Component auth={auth} {...props} />;
//   };
// }



import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();

		if (auth.user) {
			router.replace("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user) {
			router.push("/login");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}