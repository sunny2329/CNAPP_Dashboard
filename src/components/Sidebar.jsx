import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget, setIsOpen } from '../Redux/Slices/dashboardSlice.js'; // Adjust the path to your slice accordingly
import '../Sidebar.css'; // Assuming the correct path to Sidebar.css

function Sidebar() {
    const isOpen = useSelector((state) => state.dashboardSlice.isOpen);
    const [tempSelectedWidgets, setTempSelectedWidgets] = useState({});
    const [openCategory, setOpenCategory] = useState(null); // Track the open category
    const [modalOpen, setModalOpen] = useState(false); // Track modal state
    const [newWidget, setNewWidget] = useState({ name: '', text: '' });
    const categories = useSelector((state) => state.dashboardSlice.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialSelectedWidgets = {};
        categories.forEach((category) => {
            initialSelectedWidgets[category.category] = category.widgets.map(widget => widget.name);
        });
        setTempSelectedWidgets(initialSelectedWidgets);
    }, [categories]);

    const toggleSidebar = (categoryName) => {
        setOpenCategory(categoryName);
        dispatch(setIsOpen(!isOpen));
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleCheckboxChange = (categoryName, widgetName) => {
        setTempSelectedWidgets((prevState) => {
            const newSelectedWidgets = { ...prevState };
            if (!newSelectedWidgets[categoryName]) {
                newSelectedWidgets[categoryName] = [];
            }

            if (newSelectedWidgets[categoryName].includes(widgetName)) {
                newSelectedWidgets[categoryName] = newSelectedWidgets[categoryName].filter((name) => name !== widgetName);
            } else {
                newSelectedWidgets[categoryName].push(widgetName);
            }
            return newSelectedWidgets;
        });
    };

    const handleConfirm = () => {
        Object.keys(tempSelectedWidgets).forEach((categoryName) => {
            const widgets = tempSelectedWidgets[categoryName];
            categories.find((category) => category.category === categoryName).widgets.forEach((widget) => {
                if (!widgets.includes(widget.name)) {
                    dispatch(removeWidget({ categoryName, widgetName: widget.name }));
                }
            });
            widgets.forEach((widgetName) => {
                const widgetExists = categories
                    .find((category) => category.category === categoryName)
                    .widgets.find((widget) => widget.name === widgetName);

                if (!widgetExists) {
                    dispatch(addWidget({
                        categoryName,
                        widget: { name: widgetName, type: "custom", data: "Custom data" }
                    }));
                }
            });
        });
        dispatch(setIsOpen(false));
        document.body.style.overflow = 'auto';
    };

    const handleAddWidgetClick = (categoryName) => {
        setOpenCategory(categoryName);
        setModalOpen(true); // Open modal when Add Widget is clicked
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setNewWidget({ name: '', text: '' });
    };

    const handleAddWidget = () => {
        dispatch(addWidget({
            categoryName: openCategory,
            widget: { name: newWidget.name, text: newWidget.text, type: "custom", data: "Custom data" }
        }));
        handleModalClose();
    };

    return (
        <div>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={() => toggleSidebar(null)}></div>
            <div className={`sidebar flex justify-between flex-col ${isOpen ? 'active' : ''}`}>
                <div className="one">
                    <div className="title px-4 py-2 w-full flex justify-between items-center bg-blue-900 text-white">
                        <h5>Add Widget to {openCategory}</h5>
                        <button onClick={() => toggleSidebar(null)}>
                            <IoClose />
                        </button>
                    </div>
                    <div className="desc px-1 py-3 text-sm">
                        Personalize your dashboard by adding the following widget
                    </div>
                </div>
                <div className="widget-list px-4">
                    {openCategory && categories.find(category => category.category === openCategory).widgets.map((widget) => (
                        <div key={widget.name}>
                            <input
                                type="checkbox"
                                checked={tempSelectedWidgets[openCategory]?.includes(widget.name) || false}
                                onChange={() => handleCheckboxChange(openCategory, widget.name)}
                            />
                            {widget.name}
                        </div>
                    ))}
                </div>
                <div className="twp flex justify-end">
                    <div className="btn flex gap-3 py-2 px-4 mr-1">
                        <button className='p-2 text-blue-950 text-xs border-2 border-blue-950 rounded-lg w-[100px]' onClick={() => toggleSidebar(null)}>Cancel</button>
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
