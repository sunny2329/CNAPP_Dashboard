import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget, setIsOpen } from '../Redux/Slices/dashboardSlice.js';
import '../Sidebar.css';

function Sidebar() {
    const isOpen = useSelector((state) => state.dashboardSlice.isOpen);
    const activeCategory = useSelector((state) => state.dashboardSlice.activeCategory);
    const categories = useSelector((state) => state.dashboardSlice.categories);
    const dispatch = useDispatch();

    const [tempSelectedWidgets, setTempSelectedWidgets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newWidget, setNewWidget] = useState({ name: '', text: '' });

    const activeCategoryData = categories.find(category => category.category === activeCategory);

    useEffect(() => {
        if (activeCategoryData) {
            setTempSelectedWidgets(activeCategoryData.widgets.map(widget => widget.name));
        }
    }, [activeCategoryData]);

    const toggleSidebar = () => {
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
            // Remove unselected widgets
            activeCategoryData.widgets.forEach((widget) => {
                if (!tempSelectedWidgets.includes(widget.name)) {
                    dispatch(removeWidget({ categoryName: activeCategory, widgetName: widget.name }));
                }
            });

            // Add new selected widgets
            tempSelectedWidgets.forEach((widgetName) => {
                const widgetExists = activeCategoryData.widgets.find((widget) => widget.name === widgetName);
                if (!widgetExists) {
                    dispatch(addWidget({
                        categoryName: activeCategory,
                        widget: { name: widgetName, type: "custom", data: "Custom data" }
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
                widget: { name: newWidget.name, text: newWidget.text, type: "custom", data: "Custom data" }
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
                </div>
                <div className="widget-list px-4">
                    {activeCategoryData ? (
                        <div>
                            <h3>{activeCategory}</h3>
                            <button onClick={handleAddWidgetClick}>+ Add Widget</button>
                            {activeCategoryData.widgets.map((widget) => (
                                <div key={widget.name}>
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedWidgets.includes(widget.name)}
                                        onChange={() => handleCheckboxChange(widget.name)}
                                    />
                                    {widget.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No active category selected</p>
                    )}
                </div>
                <div className="twp flex justify-end">
                    <div className="btn flex gap-3 py-2 px-4 mr-1">
                        <button className='p-2 text-blue-950 text-xs border-2 border-blue-950 rounded-lg w-[100px]' onClick={toggleSidebar}>Cancel</button>
                        <button className='p-2 text-white text-xs border-2 rounded-lg w-[100px] bg-blue-950' onClick={handleConfirm}>Confirm</button>
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
                        <div className="modal-actions">
                            <button onClick={handleModalClose}>Cancel</button>
                            <button onClick={handleAddWidget}>Add Widget</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
