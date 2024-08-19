import React from 'react';
import { FaBell } from 'react-icons/fa'; // Example for bell icon, you can choose other icons as needed

const DashboardHeader = () => {
    return (
        <div className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
            {/* Breadcrumbs */}
            <div className="text-gray-500 text-sm">
                <span>Home</span> <span className="mx-2">&gt;</span> <span className="text-gray-800">Dashboard V2</span>
            </div>

            {/* Search bar and icons */}
            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                />

                {/* Bell icon */}
                <FaBell className="text-gray-600 cursor-pointer" />

                {/* Other icons can be added similarly */}
                {/* Profile or dropdown */}
                <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>
        </div>
    );
};

export default DashboardHeader;
