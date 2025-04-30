import React from 'react'

const ReviewLoader = () => {
    return (
        <div className="w-full max-w-[95%] border border-gray-200 bg-[#ffff] rounded-2xl shadow-lg p-6 transition-all duration-300 mt-5 animate-pulse">
            {/* Avatar & Name Skeleton */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-300"></div>
                <div className="flex flex-col gap-2">
                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Star Rating Skeleton */}
            <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
                ))}
            </div>

            {/* Review Text Skeleton */}
            <div className="space-y-2">
                <div className="w-full h-3 bg-gray-300 rounded"></div>
                <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
            </div>
        </div>

    )
}

export default ReviewLoader
