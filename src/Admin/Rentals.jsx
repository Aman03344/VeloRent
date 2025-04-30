"use client"

import { Search, Filter, ChevronDown } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRentalsFormAdmin } from "../features/rentals/rentalSlice"
import { toast } from "react-toastify"

const Rentals = () => {
  const dispatch = useDispatch()
  const { rentals, isLoading, isSuccess, isError, message } = useSelector((state) => state.rentals)

  useEffect(() => {
    dispatch(getRentalsFormAdmin())
    if (isError && message) {
      toast.error(message)
    }
  }, [isError, message])

  return (
    <div className="p-4 md:p-6 relative md:mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">Rental Management</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search rentals..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-300 focus:outline-none focus:border-orange-300 w-full"
              disabled
            />
          </div>

          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-default">
              <Filter className="w-4 h-4 text-gray-500" />
              <span>Filter: All</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left">
            <tr className="text-gray-500 font-medium">
              <th className="px-4 py-3 md:py-4">Rental ID</th>
              <th className="px-4 py-3 md:py-4">Customer</th>
              <th className="px-4 py-3 md:py-4">Car</th>
              <th className="px-4 py-3 md:py-4">Duration</th>
              <th className="px-4 py-3 md:py-4">Amount</th>
              <th className="px-4 py-3 md:py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {isLoading ? (
              <>
                <tr className="animate-pulse">
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-3 md:py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {rentals?.users?.map((user) =>
                  user?.rentals?.map((rental) => (
                    <tr key={rental._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 md:py-4 font-semibold text-gray-900">{rental?._id}</td>
                      <td className="px-4 py-3 md:py-4">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </td>
                      <td className="px-4 py-3 md:py-4">
                        <div className="font-medium">{rental?.car?.name}</div>
                        <div className="text-xs text-gray-500">{rental?.car?.category}</div>
                      </td>
                      <td className="px-4 py-3 md:py-4">
                        <div className="text-md ">
                          {Math.ceil(
                            (new Date(rental?.dropDate) - new Date(rental?.pickupDate)) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </div>
                        <div className="font-medium text-gray-500 text-[10px]">
                          {rental?.pickupDate} - {rental?.dropDate}
                        </div>
                      </td>

                      <td className="px-4 py-3 md:py-4 font-semibold">₹{rental?.totalBill}</td>
                      <td className="px-4 py-3 md:py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs`}>
                          {rental?.status}
                        </span>
                      </td>
                    </tr>
                  )),
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <div className="text-sm text-gray-500">
          Showing {rentals.length} of {rentals.length} rentals
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm cursor-default">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm cursor-default">Next</button>
        </div>
      </div>
    </div>
  )
}

export default Rentals
