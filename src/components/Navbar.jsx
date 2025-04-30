"use client"

import { useState, useEffect, useRef } from "react"
import { User, Settings, Shield, Moon, LogOut, Menu, X, UserCircle, Car } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOutUser } from "../features/AUTH/authSlice"

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const desktopProfileRef = useRef(null)
  const mobileProfileRef = useRef(null)

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopProfileRef.current && !desktopProfileRef.current.contains(event.target)) {
        setDesktopProfileOpen(false)
      }
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target)) {
        setMobileProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
  }, [menuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-1 w-72 bg-[#fffffff8] rounded-xl shadow-xl overflow-hidden z-50 transition-all duration-300 ease-in-out transform origin-top-right">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
          <div>
            <h3 className="font-medium text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Link to={"/profile"} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
          <User className="w-5 h-5 mr-3 text-gray-500" />
          <span>My Profile</span>
        </Link>
        {
          !user.isAdmin ? (<> <Link to={"/my-rentals"} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
            <Car className="w-5 h-5 mr-3 text-gray-500" />
            <span>My Rentals</span>
          </Link></>) : (<></>)
        }
        <Link to={"/settings"} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 mr-3 text-gray-500" />
          <span>Settings</span>
        </Link>
        {user?.isAdmin ? (
          <>
            <p className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
              <Shield className="w-5 h-5 mr-3 text-gray-500" />
              <Link to={"/admin"}>Admin Panel</Link>
            </p>
          </>
        ) : (
          <></>
        )}

      </div>

      <div className="border-t border-gray-100 py-2">
        <p
          onClick={handleLogOut}
          className="flex items-center px-4 py-3 text-red-500 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </p>
      </div>
    </div>
  )

  const handleLogOut = () => {
    dispatch(logOutUser())
    navigate("/")
  }

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const searchQuery = e.target.search.value
    navigate(`/search?query=${searchQuery}`)
  }

  return (
    <header className="w-full flex justify-between items-center px-6 py-1.5 md:py-3 shadow-sm fixed bg-[#fffffffa] md:z-10 z-10 top-0">
      <Link to={"/"} className="text-3xl font-bold">
        VeloRent
      </Link>

      {/* Desktop Nav */}
      <nav className="space-x-8 text-lg font-bold hidden md:flex">
        <Link to={"/"} className={`hover:text-orange-500 ${isActive("/") ? "text-orange-500" : ""}`}>
          Home
        </Link>

        <Link to={"/about"} className={`hover:text-orange-500 ${isActive("/about") ? "text-orange-500" : ""}`}>
          About
        </Link>
        <Link to={"/contact"} className={`hover:text-orange-500 ${isActive("/contact") ? "text-orange-500" : ""}`}>
          Contact
        </Link>
      </nav>

      {/* Buttons */}
      {/* Desktop Profile */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to={"/login"}
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full font-medium hover:bg-orange-600 hidden md:block"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <div className="relative hidden md:block" ref={desktopProfileRef}>
              <button
                className="rounded-full p-2 border border-gray-300 cursor-pointer"
                onClick={() => setDesktopProfileOpen(!desktopProfileOpen)}
              >
                <UserCircle className="w-5 h-5" />
              </button>
              {desktopProfileOpen && <ProfileDropdown />}
            </div>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
          <span className="p-2 rounded-full border border-gray-200 text-xl flex items-center justify-center">
            <Menu className="w-4 h-4" />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          } transform`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-xl text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col space-y-4">
          <Link to={"/"} className={`text-lg ${isActive("/") ? "text-orange-500" : ""}`}>
            Home
          </Link>

          <Link to={"/about"} className={`text-lg ${isActive("/about") ? "text-orange-500" : ""}`}>
            About
          </Link>
          <Link to={"/contact"} className={`text-lg ${isActive("/contact") ? "text-orange-500" : ""}`}>
            Contact
          </Link>

          {user && (
            <Link to={"/my-rentals"} className={`text-lg ${isActive("/my-rentals") ? "text-orange-500" : ""}`}>
              My Rentals
            </Link>
          )}

          {/* Mobile Profile */}
          <div className="flex items-center pt-6 relative" ref={mobileProfileRef}>
            {!user ? (
              <Link
                to={"/login"}
                className="bg-orange-500 text-white px-4 py-1.5 rounded-full font-medium hover:bg-orange-600 w-full text-center"
              >
                Login
              </Link>
            ) : (
              <>
                <button
                  className="rounded-full p-2 border border-gray-300 cursor-pointer mr-4"
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                >
                  <UserCircle className="w-4 h-4" />
                </button>

                {mobileProfileOpen && <ProfileDropdown />}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
