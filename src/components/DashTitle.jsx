import React from 'react';
import { FaPlus, FaSync, FaEllipsisV, FaClock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addCategory } from '../Redux/Slices/dashboardSlice';
import { useState } from 'react';
import '../Sidebar.css'

const DashTitle = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [newCat,setNewCat] = useState("");
    const handleModalClose = () => {
        setModalOpen(false);
        setNewCat("");
    };

    const handleAddCategory = () => {
        dispatch(addCategory({categoryName:newCat}));
        handleModalClose();
    };
    return (
        <div className="bg-transparent py-2 px-4 mt-4 flex justify-between items-center">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800">CNAPP Dashboard</h1>

            {/* Right-side controls */}
            <div className="flex items-center space-x-4">
                {/* Add Widget Button */}
                <button onClick={() => {
                    setModalOpen(true);
                }} className="flex items-center space-x-2 bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100">
                    <FaPlus />
                    <span>Add Category</span>
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


            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCat}
                            onChange={(e) => setNewCat(e.target.value)}
                        />
                        <button onClick={handleAddCategory}>Add Category</button>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashTitle;
