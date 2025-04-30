"use client"

import { useEffect, useState } from "react"
import { FaSave, FaUserCog, FaLock, FaBell, FaCreditCard } from "react-icons/fa"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const tabs = [
    { id: "profile", name: "Profile Settings", icon: FaUserCog },
    { id: "security", name: "Security", icon: FaLock },
    { id: "notifications", name: "Notifications", icon: FaBell },
    { id: "billing", name: "Billing", icon: FaCreditCard },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 border-r border-gray-200">
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${
                        activeTab === tab.id ? "bg-orange-50 text-orange-500" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="mr-3" />
                      <span>{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex-1 p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                        defaultValue="Admin"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                        defaultValue="User"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                      defaultValue="admin@carrentals.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                      defaultValue="+91 9876543210"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" /> Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-orange-300 focus:outline-none focus:border-orange-300 duration-500"
                        />
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        "New bookings",
                        "Booking updates",
                        "Booking cancellations",
                        "Customer reviews",
                        "System updates",
                      ].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-gray-600">{item}</span>
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 "></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" /> Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Billing Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Methods</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-500">No payment methods added yet.</p>
                    </div>
                    <button
                      type="button"
                      className="mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      Add Payment Method
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Billing History</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-500">No billing history available.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
