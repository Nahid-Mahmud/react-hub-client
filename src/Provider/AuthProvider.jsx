import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../FireBase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// authcontext
export const AuthContext = createContext(null);
// auth for firebase
const auth = getAuth(app);
// provider for google
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  //use state for user
  const [user, setUser] = useState(null);
  // use state for user Loading time
  const [loading, setLoading] = useState(true);

  // google sign in
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // singup with email pasword
  const emailPassSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email Passwornd login
  const emailPassLogin = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut
  const signoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // User observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("token");
      }

      console.log("user Form authProvider observer", currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  // const demoUser = { name: "nahid" };

  const authValues = {
    // demoUser,
    googleLogIn,
    signoutUser,
    user,
    loading,
    emailPassSignup,
    emailPassLogin,
  };

  return (
    <AuthContext.Provider value={authValues}>{children} </AuthContext.Provider>
  );
};

export default AuthProvider;
