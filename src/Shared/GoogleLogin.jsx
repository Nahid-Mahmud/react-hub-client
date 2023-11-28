import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const GoogleLogin = ({ text, setSignInUpErr }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { googleLogIn } = useAuth();
  const handleGoogleLogin = () => {
    setSignInUpErr("");
    googleLogIn()
      .then((result) => {
        if (result) {
          console.log("user found");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Log In successFull",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // console.log(result.user);
        const badge = "bronze";
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          badge,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId > 0) {
            console.log("user created successfully");
          }
        });

        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err.message);
        setSignInUpErr(err.message);
      });
  };
  return (
    <div className="w-fit  mx-auto">
      <button
        onClick={handleGoogleLogin}
        className="hover:scale-110 transition items-center text-base flex outline gap-5 px-5 focus:ring-4 focus:outline-none font-medium rounded-lg  py-2.5 text-center dark:bg-blue-600  text-black"
      >
        <FcGoogle className="text-2xl"></FcGoogle> {text}
      </button>
    </div>
  );
};

export default GoogleLogin;
