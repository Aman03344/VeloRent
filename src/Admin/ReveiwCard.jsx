import { Star } from "lucide-react";

const ReviewCard = ({ review, name }) => {
  const firstLetter = name?.charAt(0).toUpperCase(); // Extract the first letter of the name

  return (
    <div className="w-full max-w-[95%] border border-gray-200 bg-[#ffff] rounded-2xl shadow-lg p-6 text-white transition-all duration-300 mt-5">
      {/* Avatar & Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-[#FFEDD4] flex items-center justify-center text-orange-500 font-bold">
          {firstLetter} {/* Display the first letter of the name */}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          <p className="text-sm text-gray-400 font-semibold">Car name: {review?.carName}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-500 text-sm">
        {review?.comment || "No review text available."}
      </p>
    </div>
  );
};

export default ReviewCard;
