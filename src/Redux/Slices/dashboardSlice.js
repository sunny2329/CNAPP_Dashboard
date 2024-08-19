import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [
        {
            category: 'CSPM Executive Dashboard',
            widgets: [
                {
                    name: "Cloud Accounts",
                    type: "doughnut",
                    data: {
                        labels: ['Connected', 'Not Connected'],
                        value: [2, 2]
                    }
                },
                {
                    name: "Cloud Account Risk Assessment",
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
                    data: null
                },
                {
                    name: "Workload Alerts",
                    data: null
                }
            ]
        },
        {
            category: "Registry Scan",
            widgets: [
                {
                    name: "Image Risk Assessment",
                    type: "progress",
                    data: {
                        labels: ["Critical", "High", "Medium", "Normal", "Low"],
                        value: [9, 150, 303, 250, 2],
                        total: 1479
                    }
                },
                {
                    name: "Image Security Issues",
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
}


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryName, widget } = action.payload;
            const category = state.categories.find((cate) => {
                return cate.category === categoryName;
            });
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryName, widgetName } = action.payload;
            const category = state.categories.find((cate) => {
                return cate.category === categoryName;
            });
            if (category) {
                category.widgets = category.widgets.filter((widget) => {
                    return widget.name !== widgetName;
                })
            }
        },
        addCategory: (state, action) => {
            const { categoryName } = action.payload;
            state.categories.push({
                category: categoryName,
                widgets: [],
            })
        },
        removeCategory: (state, action) => {
            const { categoryName } = action.payload;
            state.categories = state.categories.filter((cate) => {
                return cate.category !== categoryName;
            })
        },
        setIsOpen: (state,action) => {
            state.isOpen = action.payload;
        },
        setActiveCategory: (state,action) => {
            state.activeCategory = action.payload;
        }
    }
})

export const { addCategory,setIsOpen,setActiveCategory, removeCategory, addWidget, removeWidget } = dashboardSlice.actions;

export default dashboardSlice.reducer;
