import { createContext } from "react";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "../FireBase/Firebase.config";


// authcontext
export const AuthContext = createContext(null);
// auth for firebase
const auth = getAuth(app);
// provider for google
const googeleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const demoUser = { name: "nahid" };

  const authValues = {
    demoUser,
  };

  return (
    <AuthContext.Provider value={authValues}>{children} </AuthContext.Provider>
  );
};

export default AuthProvider;
