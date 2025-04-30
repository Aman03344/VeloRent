"use client"

import { CiSearch } from "react-icons/ci"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <div className="w-full md:max-w-xl bg-orange-200 rounded-full p-2 flex justify-center items-center mt-3">
      <form
        onSubmit={handleSearch}
        className="w-full md:max-w-xl flex justify-center items-center py-2 px-2 rounded-full bg-white"
      >
        <input
          className="w-full h-[100%] px-5 rounded-full outline-none text-[18px] bg-transparent"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}


        />
        <button
          type="submit"
          className="text-2xl border bg-orange-400 text-white font-black px-7 py-4 rounded-full cursor-pointer"
        >
          <CiSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
