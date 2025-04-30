import { GoHome } from "react-icons/go"
import { Link } from "react-router-dom"

const HomeButton = () => {
  return (
    <button className="w-full px-4 py-2 bg-gray-100 border border-gray-200 hover:bg-orange-100 duration-300 rounded-xl text-orange-500 flex items-center justify-center gap-2">
      <GoHome size={18} />
      <Link to={"/"} className="font-medium">
        Back to Home
      </Link>
    </button>
  )
}

export default HomeButton
