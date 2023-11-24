import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export const useAuth = () => {
  const authValue = useContext(AuthContext);
  return authValue;
};
