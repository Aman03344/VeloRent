"use client"

import { useEffect, useState } from "react"
import CarCard from "./CarCard"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import { getCars } from "../features/CAR/carSlice"
import { toast } from "react-toastify"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CarContainer = () => {
  const { cars, isLoading, isError, isSuccess, message } = useSelector((state) => state.car)
  const [currentPage, setCurrentPage] = useState(1)
  const [carsPerPage] = useState(6) // Show 6 cars per page
  const [totalPages, setTotalPages] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCars())
  }, [dispatch])

  useEffect(() => {
    if (isError && message) {
      toast.error(message)
    }
  }, [isError, message])

  // Calculate total pages whenever cars array changes
  useEffect(() => {
    if (cars && cars.length > 0) {
      setTotalPages(Math.ceil(cars.length / carsPerPage))
    }
  }, [cars, carsPerPage])

  // Get current cars
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = cars && cars.length > 0 ? cars.slice(indexOfFirstCar, indexOfLastCar) : []

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top of car container
    const container = document.getElementById("car-container")
    if (container) {
      window.scrollTo({
        top: container.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      scrollToContainer()
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      scrollToContainer()
    }
  }

  const scrollToContainer = () => {
    const container = document.getElementById("car-container")
    if (container) {
      window.scrollTo({
        top: container.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Generate pagination numbers with ellipsis for many pages
  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1)
    const end = Math.min(start + 4, totalPages)

    // Adjust start if end is maxed out
    if (end === totalPages) {
      start = Math.max(end - 4, 1)
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <section id="car-container" className="px-4 md:px-6 py-8 bg-white">
        <h2 className="text-2xl font-semibold mb-6">Featured Vehicles</h2>

        {cars.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No cars available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full border ${
                      currentPage === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-orange-50"
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* First page */}
                  {getPaginationGroup()[0] > 1 && (
                    <>
                      <button
                        onClick={() => paginate(1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-orange-50"
                      >
                        1
                      </button>
                      {getPaginationGroup()[0] > 2 && <span className="px-1 text-gray-500">...</span>}
                    </>
                  )}

                  {/* Page numbers */}


                  
                  {getPaginationGroup().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === number
                          ? "bg-orange-500 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50"
                      }`}
                      aria-label={`Page ${number}`}
                      aria-current={currentPage === number ? "page" : undefined}
                    >
                      {number}
                    </button>
                  ))}

                  {/* Last page */}
                  {getPaginationGroup()[getPaginationGroup().length - 1] < totalPages && (
                    <>
                      {getPaginationGroup()[getPaginationGroup().length - 1] < totalPages - 1 && (
                        <span className="px-1 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => paginate(totalPages)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-orange-50"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full border ${
                      currentPage === totalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-orange-50"
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Page indicator */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing {indexOfFirstCar + 1}-{Math.min(indexOfLastCar, cars.length)} of {cars.length} cars
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default CarContainer
