import React from 'react';
import { FaPlus, FaSync, FaEllipsisV, FaClock } from 'react-icons/fa';

const DashTitle = () => {
    return (
        <div className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800">CNAPP Dashboard</h1>

            {/* Right-side controls */}
            <div className="flex items-center space-x-4">
                {/* Add Widget Button */}
                <button className="flex items-center space-x-2 bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100">
                    <FaPlus />
                    <span>Add Widget</span>
                </button>

                {/* Refresh Icon */}
                <button className="bg-white text-gray-800 border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
                    <FaSync />
                </button>

                {/* More Options */}
                <button className="bg-white text-gray-800 border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
                    <FaEllipsisV />
                </button>

                {/* Date Picker */}
                <button className="flex items-center space-x-2 bg-white text-blue-800 border border-blue-800 rounded-lg px-3 py-2 hover:bg-blue-100">
                    <FaClock />
                    <span>Last 2 days</span>
                    <FaEllipsisV />
                </button>
            </div>
        </div>
    );
};

export default DashTitle;
