"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  Edit,
  Bell,
  CreditCard,
  LogOut,
  ChevronRight,
  Save,
} from "lucide-react";
import { logOutUser } from "../features/AUTH/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const userData = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    isAdmin: false,
    joinDate: "January 2023",
    address: "123 Main Street, Mumbai, India",
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
   
  ];

  const handleLogOut =(e)=>{
    e.preventDefault()

    dispatch(logOutUser())

    if(!user){
      navigate("/")

    }



  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500">
                    {userData.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {userData.name}
                </h2>
                <p className="text-gray-500">
                  {userData.isAdmin ? "Administrator" : "User"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {userData.joinDate}
                </p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-orange-50 text-orange-500"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <tab.icon size={18} className="mr-3" />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}

                <button onClick={handleLogOut} className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4">
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <button className="flex items-center text-orange-500 hover:text-orange-600">
                      <Edit size={16} className="mr-1" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
                          <User size={18} className="text-gray-400 mr-2" />
                          <input
                            type="text"
                            value={userData.name}
                            readOnly
                            className="w-full bg-transparent focus:outline-none text-gray-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
                          <Mail size={18} className="text-gray-400 mr-2" />
                          <input
                            type="email"
                            value={userData.email}
                            readOnly
                            className="w-full bg-transparent focus:outline-none text-gray-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
                          <Phone size={18} className="text-gray-400 mr-2" />
                          <input
                            type="tel"
                            value={userData.phone}
                            readOnly
                            className="w-full bg-transparent focus:outline-none text-gray-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
                          <input
                            type="text"
                            value={userData.address}
                            readOnly
                            className="w-full bg-transparent focus:outline-none text-gray-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center">
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* The same method applies to render "security", "notifications", and "payment" sections – just remove all `dark:` classes inside those as well. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
