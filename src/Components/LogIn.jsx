import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = () => {
  const { signInWithEmailPass, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    signInWithEmailPass(email, password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something wrong,please try again",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast("Google sign in successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        toast("Something wrong, please try again");
      });
  };

  return (
    <div className="max-w-7xl bg-gray-200 mx-auto p-10">
      <div className="w-full mx-auto max-w-md p-4 rounded-md shadow-2xl sm:p-8 bg-gray-100">
        <h2 className="mb-3 text-3xl font-bold text-center">Sign In to start learning</h2>
        <p className="text-sm text-center dark:text-gray-600 flex gap-3 justify-center">
          Don't have an account?
          <Link to="/signup">
            <button className="focus:underline hover:underline text-[#e67e22]">SignUp here</button>
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                id="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-gray-600 rounded-md"
              />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-[#2c3e50]"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password", { required: true })}
                  id="password"
                  placeholder="*****"
                  className="w-full px-4 py-3 border border-gray-600 rounded-md "
                />
                <span
                  className="absolute top-1/3 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye />}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-ghost w-full text-white hover:text-[#2c3e50] px-8 py-3 font-semibold rounded-md bg-[#e67e22]"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-black" />
          <p className="px-3 text-[#2c3e50]">OR</p>
          <hr className="w-full text-black" />
        </div>

        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            aria-label="Login with Google"
            type="button"
            className="btn btn-ghost flex items-center justify-center w-full p-4 space-x-4 border rounded-md border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>SignIn with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
