import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/AUTH/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Register = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message, { position: "top-center" });
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white mt-10">
      <div className="w-[400px] h-[70px] rounded-full blur-[100px] absolute top-0 right-[50%] bg-white"></div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?
              <Link
                to={"/login"}
                className="font-medium text-blue-600 hover:text-blue-500 ml-1 cursor-pointer"
              >
                LogIn
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  {/* User Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  id="full-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  {/* Email Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  {/* Phone Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input
                  id="phone"
                  type="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  {/* Lock Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center cursor-pointer py-4 px-4 border border-transparent rounded-full shadow-sm text-md font-medium text-white bg-orange-400 hover:bg-orange-300 transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
