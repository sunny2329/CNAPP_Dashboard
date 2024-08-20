// src/Components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, updateWidgetStatus, setIsOpen, removeWidget } from '../Redux/Slices/dashboardSlice.js';
import '../Sidebar.css';
import { MdDelete } from 'react-icons/md';

function Sidebar() {
    const isOpen = useSelector((state) => state.dashboardSlice.isOpen);
    const activeCategory = useSelector((state) => state.dashboardSlice.activeCategory);
    const categories = useSelector((state) => state.dashboardSlice.categories);
    const dispatch = useDispatch();

    const [tempSelectedWidgets, setTempSelectedWidgets] = useState([]);
    const [initialWidgets, setInitialWidgets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newWidget, setNewWidget] = useState({ name: '', text: '' });

    const activeCategoryData = categories.find(category => category.category === activeCategory);
    console.log(activeCategoryData,'dd');
    useEffect(() => {
        if (activeCategoryData) {
            // Set initial widgets state
            setInitialWidgets(activeCategoryData.widgets.map(widget => ({
                name: widget.name,
                status: widget.status
            })));

            // Set temporary selected widgets state
            setTempSelectedWidgets(activeCategoryData.widgets.filter(widget => widget.status === 'active').map(widget => widget.name));
        }
    }, [activeCategoryData]);

    const toggleSidebar = () => {
        if (isOpen) {
            // Reset tempSelectedWidgets to initialWidgets state on sidebar close
            setTempSelectedWidgets(initialWidgets.filter(widget => widget.status === 'active').map(widget => widget.name));
        }
        dispatch(setIsOpen(!isOpen));
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleCheckboxChange = (widgetName) => {
        setTempSelectedWidgets((prevSelectedWidgets) => {
            if (prevSelectedWidgets.includes(widgetName)) {
                return prevSelectedWidgets.filter((name) => name !== widgetName);
            } else {
                return [...prevSelectedWidgets, widgetName];
            }
        });
    };

    const handleConfirm = () => {
        if (activeCategoryData) {
            // Update status for widgets
            activeCategoryData.widgets.forEach((widget) => {
                if (!tempSelectedWidgets.includes(widget.name)) {
                    dispatch(updateWidgetStatus({
                        categoryName: activeCategory,
                        widgetName: widget.name,
                        status: 'inactive'
                    }));
                }
            });

            // Add new selected widgets
            tempSelectedWidgets.forEach((widgetName) => {
                const widgetExists = activeCategoryData.widgets.find((widget) => widget.name === widgetName);
                if (!widgetExists) {
                    dispatch(addWidget({
                        categoryName: activeCategory,
                        widget: { name: widgetName, text: 'Custom data', type: "custom", data: "Custom data", status: 'active' }
                    }));
                } else {
                    // Ensure status is set to 'active' if widget already exists
                    dispatch(updateWidgetStatus({
                        categoryName: activeCategory,
                        widgetName: widgetName,
                        status: 'active'
                    }));
                }
            });
        }

        dispatch(setIsOpen(false));
        document.body.style.overflow = 'auto';
    };

    const handleAddWidgetClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setNewWidget({ name: '', text: '' });
    };

    const handleAddWidget = () => {
        if (activeCategory) {
            dispatch(addWidget({
                categoryName: activeCategory,
                widget: { name: newWidget.name, text: newWidget.text, type: "custom", data: "Custom data", status: 'active' }
            }));
            handleModalClose();
        }
    };

    return (
        <div>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar flex justify-between flex-col ${isOpen ? 'active' : ''}`}>
                <div className="one">
                    <div className="title px-4 py-2 w-full flex justify-between items-center bg-blue-900 text-white">
                        <h5>Add Widget</h5>
                        <button onClick={toggleSidebar}>
                            <IoClose />
                        </button>
                    </div>
                    <div className="desc px-1 py-3 text-sm">
                        Personalize your dashboard by adding the following widget
                    </div>
                    <div className="">
                        {activeCategoryData ? (
                            <div className='flex flex-col max-h-[70vh] overflow-scroll scrollbar-none' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <div className='flex w-full justify-between items-center mb-5 mt-5 px-4'>
                                    <h1>{activeCategoryData.category}</h1>
                                    <div className="flex items-center mr-5">
                                        <button
                                            onClick={handleAddWidgetClick}
                                            className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                            + Add Widget
                                        </button>
                                    </div>
                                </div>

                                {activeCategoryData.widgets.map((widget) => (
                                    <div className='flex justify-between items-center border-t-2 border-b-2'>
                                        <div
                                            key={widget.name}
                                            className="py-2 px-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedWidgets.includes(widget.name)}
                                                onChange={() => handleCheckboxChange(widget.name)}
                                                className='mr-3 mt-1'
                                            />
                                            <label className="text-sm">{widget.name}</label>
                                        </div>
                                        <button title='Delete' className='text-red-700 mr-7 opacity-55' onClick={() => {
                                            dispatch(removeWidget({categoryName:activeCategoryData.category, widgetName:widget.name}));
                                        }}>
                                            <MdDelete/>
                                        </button>
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <p>No active category selected</p>
                        )}
                    </div>
                </div>

                <div className="twp flex justify-end">
                    <div className="btn flex gap-3 py-2 px-4 mr-1">
                        <button
                            className="p-2 text-blue-950 text-xs border-2 border-blue-950 rounded-lg w-[100px]"
                            onClick={toggleSidebar}>
                            Cancel
                        </button>
                        <button
                            className="p-2 text-white text-xs border-2 rounded-lg w-[100px] bg-blue-950"
                            onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Widget</h2>
                        <input
                            type="text"
                            placeholder="Widget Name"
                            value={newWidget.name}
                            onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Widget Text"
                            value={newWidget.text}
                            onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
                        />
                        <button onClick={handleAddWidget}>Add Widget</button>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
