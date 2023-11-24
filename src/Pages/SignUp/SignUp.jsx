import { Helmet } from "react-helmet-async";
import GoogleLogin from "../../Shared/GoogleLogin";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [signInUpErr, setSignInUpErr] = useState('');

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="w-full  max-w-md ">
        <div className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form
            // onSubmit={handleForm}
            className="pb-6"
          >
            <p className="text-center  text-3xl font-semibold underline py-5">
              Create Your Account
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="name"
                placeholder="Jhon Doe"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Url
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="photourl"
                type="text"
                name="photourl"
                placeholder="https://example.png"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">
                {/* {userSignUpError} */}
                {signInUpErr}
              </p>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <input
                className="btn  bg-green-500 text-white hover:text-black hover:bg-green-600 transition"
                type="submit"
                value="Sign Up"
              />
              <p className="inline-block align-baseline font-bold  ">
                Have an account?{" "}
                <Link
                  className="text-blue-700 hover:text-blue-800"
                  to={"/login"}
                >
                  Log In
                </Link>{" "}
                here
              </p>
            </div>
          </form>
          {/* <p className="text-2xl font-medium ">
              Connect with Social Network!
            </p> */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              //   onClick={handleGoogleLogin}
              className="text-center py-7 "
            >
              <GoogleLogin
                setSignInUpErr={setSignInUpErr}
                text="Sign Up With Google "
              ></GoogleLogin>
            </div>
            <Link to={"/"}>
              <button className="btn bg-green-600 hover:bg-green-700 text-white  hover:text-black">
                Go Home
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-slate-300 text-xs">
          &copy;2023 ReactHub. All rights reserved.
        </p>
      </div>
      <Helmet>
        <title>Sign Up - ReactHub </title>
      </Helmet>
    </div>
  );
};

export default SignUp;
