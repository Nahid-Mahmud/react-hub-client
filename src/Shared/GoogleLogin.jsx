import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Hooks/useAuth";

const GoogleLogin = ({ text, setSignInUpErr }) => {
  const { googleLogIn } = useAuth();
  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        // console.log(result.user);
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
