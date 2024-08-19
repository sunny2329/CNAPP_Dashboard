// src/Redux/Slices/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Utility functions for local storage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('dashboardState', serializedState);
    } catch (err) {
        console.error('Could not save state', err);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('dashboardState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Could not load state', err);
        return undefined;
    }
};

// Initial state loaded from local storage
const initialState = loadFromLocalStorage() || {
    categories: [
        {
            category: 'CSPM Executive Dashboard',
            widgets: [
                {
                    name: "Cloud Accounts",
                    status: 'active',
                    type: "doughnut",
                    data: {
                        labels: ['Connected', 'Not Connected'],
                        value: [2, 2],
                        total:4
                    }
                },
                {
                    name: "Cloud Account Risk Assessment",
                    status: 'active',
                    type: "doughnut",
                    data: {
                        labels: ["Failed", "Warning", "Not available", "Passed"],
                        value: [1689, 681, 36, 7253],
                        total: 9659
                    }
                }
            ]
        },
        {
            category: "CWPP Dashboard",
            widgets: [
                {
                    name: "Top 5 Namespace Sepcific Alerts",
                    status: 'active',
                    data: null
                },
                {
                    name: "Workload Alerts",
                    status: 'active',
                    data: null
                }
            ]
        },
        {
            category: "Registry Scan",
            widgets: [
                {
                    name: "Image Risk Assessment",
                    status: 'active',
                    type: "progress",
                    data: {
                        labels: ["Critical", "High", "Medium", "Normal", "Low"],
                        value: [9, 150, 303, 250, 2],
                        total: 1479
                    }
                },
                {
                    name: "Image Security Issues",
                    status: 'active',
                    type: "progress",
                    data: {
                        labels: ["Critical", "High", "Medium", "Normal", "Low"],
                        value: [12, 50, 100, 30],
                        total: 212
                    }
                }
            ]
        }
    ],
    isOpen: false,
    activeCategory: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryName, widget } = action.payload;
            const category = state.categories.find((cate) => cate.category === categoryName);
            if (category) {
                category.widgets.push(widget);
                saveToLocalStorage(state); // Save state to local storage
            }
        },
        removeWidget: (state, action) => {
            const { categoryName, widgetName } = action.payload;
            const category = state.categories.find((cate) => cate.category === categoryName);
            if (category) {
                category.widgets = category.widgets.filter((widget) => widget.name !== widgetName);
                saveToLocalStorage(state); // Save state to local storage
            }
        },
        addCategory: (state, action) => {
            const { categoryName } = action.payload;
            state.categories.push({
                category: categoryName,
                widgets: [],
            });
            saveToLocalStorage(state); // Save state to local storage
        },
        removeCategory: (state, action) => {
            const { categoryName } = action.payload;
            state.categories = state.categories.filter((cate) => cate.category !== categoryName);
            saveToLocalStorage(state); // Save state to local storage
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
            saveToLocalStorage(state); // Save state to local storage
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
            saveToLocalStorage(state); // Save state to local storage
        },
        updateWidgetStatus: (state, action) => {
            const { categoryName, widgetName, status } = action.payload;
            const category = state.categories.find((cate) => cate.category === categoryName);
            if (category) {
                const widget = category.widgets.find((widget) => widget.name === widgetName);
                if (widget) {
                    widget.status = status;
                    saveToLocalStorage(state); // Save state to local storage
                }
            }
        },
    }
});

export const { addCategory,updateWidgetStatus, setIsOpen, setActiveCategory, removeCategory, addWidget, removeWidget } = dashboardSlice.actions;

export default dashboardSlice.reducer;
