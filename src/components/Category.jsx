import React from 'react'
import Widget from './Widget'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen } from '../Redux/Slices/dashboardSlice';
import { setActiveCategory } from '../Redux/Slices/dashboardSlice';

function Category() {
    const categories = useSelector((state) => state.dashboardSlice.categories);
    const isOpen = useSelector((state) => state.dashboardSlice.isOpen);
    const dispatch = useDispatch();
    console.log(categories);
    const toggleSidebar = (category) => {
        dispatch(setActiveCategory(category));
        dispatch(setIsOpen(!isOpen));
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    return (
        <>
            <div>
                {categories.map((category) => (
                    <div key={category.category}>
                        <h2 className="text-lg font-bold">{category.category}</h2>
                        <div className="widget-container grid grid-cols-3 gap-4">
                            {category.widgets.filter((wid) => {
                                return wid.status === 'active';
                            }).map((widget) => (
                                <Widget key={widget?.name} widget={widget} />
                            ))}
                            <div className='bg-white p-4 py-10 rounded-lg shadow-lg w-[360px] flex justify-center items-center h-[300px]'>
                                <button onClick={() => toggleSidebar(category.category)} className='border-[1.5px] text-sm font-semibold border-gray-500 rounded p-2 text-gray-600 opacity-55 w-[40%]'>+ Add Widget</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </>
    )
}

export default Category
