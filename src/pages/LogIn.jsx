import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/AUTH/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const LogIn = () => {
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };



  useEffect(() => {
    
    if (user) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message,{position : "top-center"});
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-white mt-5">
      <div className="w-[400px] h-[70px] rounded-full blur-[100px] absolute top-0 right-[50%] bg-white"></div>

      <div className="max-w-[410px] w-full bg-white rounded-2xl  shadow-2xl overflow-hidden ">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?
              <Link
                to={"/register"}
                className="font-medium text-blue-600 hover:text-blue-500 ml-1 "
              >
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                  placeholder="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                  placeholder="password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 accent-orange-400 text-[#ff8f50] focus:ring-[#ff8f50] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <p className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-md font-medium text-white  cursor-pointer
               bg-orange-400 hover:bg-orange-300 transition-colors duration-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
