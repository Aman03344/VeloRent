import React from "react";
import CarCategory from "../components/CarCategory";
import CarContainer from "./CarContainer";
import SearchBar from "../components/SearchBar";
import carImage from "../assets/heroImage.png";
import CanvasBackground from "../components/CanvasBackground";

const Home = () => {
  return (
    <>
      {/* Canvas for animated balls */}
      <section className="flex flex-col md:flex-row  h-[90vh] items-center justify-between px-5 pt-15 bg-gradient-to-r from-[#ffffff8f] to-orange-50 mt-6 min-h-[80vh] relative">
        <CanvasBackground />
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-5xl font-bold cursor-pointer">
            Find your <span className="text-orange-400">Dream Car</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Experience the future of mobility with our premium selection of
            vehicles. Book your perfect ride in minutes.
          </p>
          <SearchBar />
        </div>

        <div className="w-full md:w-[50%] h-[400px] rounded-xl">
          <img className="w-full rounded-full" src={carImage} alt="car" />
        </div>
      </section>
      <CarCategory />
      <CarContainer />
    </>
  );
};

export default Home;
