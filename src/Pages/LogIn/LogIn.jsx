import { Link } from "react-router-dom";
import GoogleLogin from "../../Shared/GoogleLogin";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="w-full  max-w-md ">
        <div className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form className="pb-6">
            <p className="text-center text-black text-3xl font-semibold underline  py-5">
              Join Us
            </p>
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
                {/* {signInError} */}
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
              <GoogleLogin text="Sign In With Google "></GoogleLogin>
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
        <title>Log In - ReactHub  </title>
      </Helmet>
    </div>
  );
};

export default LogIn;
