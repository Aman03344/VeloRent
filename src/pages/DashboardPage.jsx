"use client"

import { useSelector } from "react-redux"
import SideBar from "../Admin/SideBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/")
    }
  }, [user])

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <SideBar />
      <main className="flex-1 transition-all duration-300 md:ml-64">
        <div className="p-4 md:p-6 pt-20 md:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
