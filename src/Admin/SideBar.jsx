"use client"

import { useState, useEffect } from "react"
import { Home, Car, Users, Star, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import HomeButton from "../components/HomeButton"

const SideBar = () => {
  const location = useLocation()
  const [active, setActive] = useState("Dashboard")
  const [open, setOpen] = useState(false)

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname
    if (path.includes("/admin/dashboard") || path === "/admin") {
      setActive("Dashboard")
    } else if (path.includes("/admin/cars")) {
      setActive("Cars")
    } else if (path.includes("/admin/rentals")) {
      setActive("Rentals")
    } else if (path.includes("/admin/reviews")) {
      setActive("Reviews")
    }
  }, [location])

  const handleClick = (label) => {
    setActive(label)
    setOpen(false)
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest(".sidebar") && !e.target.closest(".sidebar-toggle")) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <>
      {/* Mobile Topbar */}
      <div className="p-4 bg-white shadow-md flex items-center justify-between md:hidden fixed top-0 z-50 w-full">
        <div className="text-lg font-semibold text-gray-800">{active}</div>
        <button onClick={() => setOpen(!open)} className="sidebar-toggle">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`sidebar bg-white w-64 h-screen shadow-md transform transition-transform duration-300 z-50 fixed top-0 left-0 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4 space-y-2 h-full flex flex-col">
          <div className="flex items-center justify-between md:justify-center">
            <h1 className="text-2xl font-bold py-4">Welcome! Admin</h1>
            <button className="md:hidden" onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="space-y-2 flex-grow">
            <div
              onClick={() => handleClick("Dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-orange-100 ${
                active === "Dashboard" ? "bg-orange-200" : ""
              }`}
            >
              <Home className="w-5 h-5 text-orange-500" />
              <Link to="/admin/dashboard" className="font-medium text-gray-700 w-full">
                Dashboard
              </Link>
            </div>

            <div
              onClick={() => handleClick("Cars")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-orange-100 ${
                active === "Cars" ? "bg-orange-200" : ""
              }`}
            >
              <Car className="w-5 h-5 text-orange-500" />
              <Link to="/admin/cars" className="font-medium text-gray-700 w-full">
                Cars
              </Link>
            </div>

            <div
              onClick={() => handleClick("Rentals")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-orange-100 ${
                active === "Rentals" ? "bg-orange-200" : ""
              }`}
            >
              <Users className="w-5 h-5 text-orange-500" />
              <Link to="/admin/rentals" className="font-medium text-gray-700 w-full">
                Rentals
              </Link>
            </div>

            <div
              onClick={() => handleClick("Reviews")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-orange-100 ${
                active === "Reviews" ? "bg-orange-200" : ""
              }`}
            >
              <Star className="w-5 h-5 text-orange-500" />
              <Link to="/admin/reviews" className="font-medium text-gray-700 w-full">
                Reviews
              </Link>
            </div>
          </div>

          <div className="mt-auto pb-4">
            <HomeButton />
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar
