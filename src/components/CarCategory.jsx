"use client"

import { Car, Truck, Bus, Tractor, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const categories = [
  { name: "Sedan", icon: Car, color: "text-[#F97316]" },
  { name: "SUV", icon: Tractor, color: "text-[#F97316]" },
  { name: "Hatchback", icon: Car, color: "text-[#F97316]" },
  { name: "Truck", icon: Truck, color: "text-[#F97316]" },
  { name: "Bus", icon: Bus, color: "text-[#F97316]" },
  { name: "Electric", icon: Zap, color: "text-[#F97316]" },
]

const CarCategory = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    // Dispatch a custom event that CarContainer can listen for
    window.dispatchEvent(
      new CustomEvent("car-search", {
        detail: { searchTerm: category.toLowerCase() },
      }),
    )

    // Scroll to car container section
    const carContainer = document.getElementById("car-container")
    if (carContainer) {
      carContainer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-12 px-4 h-[100%] bg-[#ffffffe8]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out group"
              >
                <div className={`mb-3 ${category.color} group-hover:scale-110 transition-transform duration-200`}>
                  <p className="p-2 rounded-full bg-gray-50 hover:bg-[#FFF7ED]">
                    <Icon size={32} strokeWidth={1} />
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CarCategory
