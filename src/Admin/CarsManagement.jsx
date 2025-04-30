"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { addCars, editCar, getCars, removeCar, updateCarDetails } from "../features/CAR/carSlice"
import SmallLoader from "../components/SmallLoader"

const CarsManagement = () => {
  const { cars, isLoading, isError, isSuccess, message, edit } = useSelector((state) => state.car)

  const [addingCar, setAddingCar] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deletingCarId, setDeletingCarId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFromData] = useState({
    name: "",
    category: "",
    rate: "",
    fuelType: "",
    registration: "",
    company: "",
    image: "",
    transmission: "",
    description: "",
    mileage: "",
    seats: "",
  })
  const { name, category, rate, fuelType, registration, company, image, transmission, description, seats, mileage } =
    formData
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = (car) => {
    setIsModalOpen(true)
    dispatch(editCar(car))
    setFromData({
      name: "",
      category: "",
      rate: "",
      fuelType: "",
      registration: "",
      company: "",
      image: "",
      transmission: "",
      description: "",
      mileage: "",
      seats: "",
    })
  }


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFromData({ ...formData, image: selectedFile })
  }

  const handleAddCar = async (e) => {
    e.preventDefault()
    setAddingCar(true)

    try {
      edit.isEdit ? await dispatch(updateCarDetails(formData)).unwrap() : await dispatch(addCars(formData)).unwrap()

      toast.success(edit.isEdit ? "Car updated successfully!" : "Car added successfully!")
      setIsModalOpen(false)
    } catch (error) {
      toast.error(edit.isEdit ? "Failed to update car" : "Failed to add car")
    } finally {
      setAddingCar(false)
    }
  }

  const handleDLT = (id) => {
    dispatch(removeCar(id))
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    setFromData(edit.car)
  }, [edit])

  useEffect(() => {
    dispatch(getCars())
    if (isError && message) {
      toast.error(message)
    }
  }, [isError, message])

  return (
    <div className="md:p-6 relative md:mt-13 mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="md:text-3xl text-xl font-bold text-gray-900">Car Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white text-sm px-3 sm:px-5 py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-orange-600"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Table Loader */}
      {isLoading ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm animate-pulse">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-left">
              <tr className="text-gray-500 font-medium">
                <th className="px-3 md:px-6 py-2 md:py-4" />
                <th className="px-3 md:px-6 py-2 md:py-4">Car Name</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Category</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Price/Day</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Status</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {[...Array(5)].map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4" />
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 flex gap-4">
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500 text-sm">No car here.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-left">
              <tr className="text-gray-500 font-medium">
                <th className="px-3 md:px-6 py-2 md:py-4" />
                <th className="px-3 md:px-6 py-2 md:py-4">Car Name</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Category</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Price/Day</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Status</th>
                <th className="px-3 md:px-6 py-2 md:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {cars?.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4" />
                  <td className="px-3 md:px-6 py-2 md:py-4 font-semibold text-gray-900">{car.name}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4">{car.category}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4">₹{car.rate} /day</td>
                  <td className="px-3 md:px-6 py-2 md:py-4">
                    {!car.isBooked ? (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">Available</span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">Unavailable</span>
                    )}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 flex items-center gap-4">
                    <button onClick={() => handleEdit(car)} className="w-4 h-4 rounded-2xl">
                      <Pencil className="text-gray-700 cursor-pointer hover:text-black" size={18} />
                    </button>
                    <button className=" w-4 h-4 rounded-sm">
                      <Trash2
                        onClick={() => handleDLT(car._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={18}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#00000070] flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-4 md:p-6 w-full max-w-5xl shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>

            <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-bold mb-1 block">Car Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Category</label>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="hatchback">HatchBack</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="coupe">Coupe</option>
                  <option value="jeep">Jeep</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Price per Day (₹)</label>
                <input
                  type="number"
                  name="rate"
                  value={rate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Fuel Type</label>
                <select
                  name="fuelType"
                  value={fuelType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                  <option value="ev">EV</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Transmission</label>
                <select
                  name="transmission"
                  value={transmission}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={seats}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Mileage (km/l)</label>
                <input
                  type="number"
                  step="0.1"
                  name="mileage"
                  value={mileage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold mb-1 block">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Registration Number</label>
                <input
                  type="text"
                  name="registration"
                  value={registration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold mb-1 block">Company</label>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2 w-full">
                <label className="text-sm font-semibold mb-2 block text-gray-700">
                  Upload Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-orange-500 file:text-white
        hover:file:bg-orange-600
        transition-all duration-300 ease-in-out
        cursor-pointer"
                  />
                </div>
              </div>


              <div className="md:col-span-2 flex gap-4 justify-end mt-4">
                <button
                  type="button"
                  // onClick={handleCancel}
                  className="px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-600 hover:text-orange-500 hover:border-orange-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition"
                >
                  {addingCar ? <SmallLoader /> : edit.isEdit ? "Update Car" : "Add Car"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarsManagement
