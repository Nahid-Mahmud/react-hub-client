import { Helmet } from "react-helmet-async";
import GoogleLogin from "../../Shared/GoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SignUp = () => {
  const { emailPassSignup } = useAuth();
  const navigate = useNavigate();
  // console.log(emailPassSignup);
  // axios public request
  const axiosPublic = useAxiosPublic();
  // react hook form
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const [signInUpErr, setSignInUpErr] = useState("");

  // handle on submint

  const onSubmit = (formData) => {
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const photourl = formData.photourl;
    const badge = "bronze";

    // email bassword login
    emailPassSignup(email, password)
      .then((result) => {
        const currentUser = result.user;
        updateProfile(currentUser, {
          displayName: name,
          photoURL: photourl,
        })
          .then(() => {
            // console.log("User Updated", currentUser);
            // post user in database
            const userInfo = {
              name,
              email,
              badge,
              role: "user",
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId > 0) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
        if (currentUser) {
          toast(" Sign Up Successfull", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
          //   e.target.reset();
        }
      })
      .catch((err) => {
        console.log(err);
        setSignInUpErr(err.message);
      });

    console.log(name, email, password, photourl, badge);
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="w-full  max-w-md ">
        <div className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form
            // onSubmit={handleForm}
            onSubmit={handleSubmit(onSubmit)}
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
                {...register("name", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="name"
                placeholder="Jhon Doe"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Url
              </label>
              <input
                {...register("photourl", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="photourl"
                type="text"
                name="photourl"
                placeholder="https://example.png"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
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
