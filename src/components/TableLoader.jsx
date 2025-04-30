import React from 'react'

const TableLoader = () => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm animate-pulse">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left">
                    <tr className="text-gray-500 font-medium">
                        <th className="px-6 py-4" />
                        <th className="px-6 py-4">Car Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price/Day</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {[...Array(5)].map((_, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4" />
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                            </td>
                            <td className="px-6 py-4 flex gap-4">
                                <div className="h-4 w-4 bg-gray-200 rounded" />
                                <div className="h-4 w-4 bg-gray-200 rounded" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableLoader
