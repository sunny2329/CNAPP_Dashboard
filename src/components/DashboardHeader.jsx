import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa'; // Added FaSearch for the search icon

const DashboardHeader = () => {
    return (
        <div className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
            {/* Breadcrumbs */}
            <div className="text-gray-500 text-sm">
                <span>Home</span> 
                <span className="mx-2">&gt;</span> 
                <span className="text-blue-950 font-bold">Dashboard V2</span>
            </div>

            {/* Search bar and icons */}
            <div className="flex items-center space-x-4">
                {/* Centered Search bar */}
                <div className="relative flex items-center w-[400px] mr-[5rem]">
                    {/* Search icon */}
                    <FaSearch className="absolute left-3 text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="pl-10 border border-blue-400 rounded-lg w-full py-1 focus:outline-none focus:border-blue-600 bg-blue-50"
                    />
                </div>

                {/* Bell icon */}
                <FaBell className="text-gray-600 cursor-pointer" />

                {/* Profile or dropdown */}
                <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>
        </div>
    );
};

export default DashboardHeader;
