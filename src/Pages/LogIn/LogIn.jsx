import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Shared/GoogleLogin";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/Firebase.config";
import { toast } from "react-toastify";
// import { auth } from "../../Provider/AuthProvider";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const [signInUpErr, setSignInUpErr] = useState("");
  const { emailPassLogin } = useAuth();
  // console.log(emailPassLogin);

  const onSubmit = (formData) => {
    setSignInUpErr("");
    console.log(formData);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        console.log("signupsuccess", res.user);
        const currentUser = res.user;
        if (currentUser) {
          toast(" Sign In Successfull", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(location.state ? location.state : "/");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSignInUpErr(err.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="w-full  max-w-md ">
        <div className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="pb-6">
            <p className="text-center text-black text-3xl font-semibold underline  py-5">
              Join Us
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}
              <p className="text-red-500 text-xs italic">
                {/* {signInError} */}

                {signInUpErr}
              </p>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <input
                className="btn bg-green-500 text-black hover:bg-green-600 transition"
                type="submit"
                value="Sign In"
              />
              <p
                className="inline-block align-baseline font-bold capitalize"
                href="#"
              >
                New Student?{" "}
                <Link
                  className="text-blue-700 hover:text-blue-800"
                  to={"/signup"}
                >
                  Sign Up
                </Link>{" "}
                here
              </p>
            </div>
          </form>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center py-7 ">
              <GoogleLogin
                setSignInUpErr={setSignInUpErr}
                text="Sign In With Google "
              ></GoogleLogin>
            </div>
            <button className="btn bg-green-600 hover:bg-green-700 text-black  hover:text-black">
              <Link to={"/"}>Go Home</Link>
            </button>
          </div>
        </div>
        <p className="text-center text-slate-300 text-xs">
          &copy;2023 ReactHub. All rights reserved.
        </p>
      </div>
      <Helmet>
        <title>Log In - ReactHub </title>
      </Helmet>
    </div>
  );
};

export default LogIn;
