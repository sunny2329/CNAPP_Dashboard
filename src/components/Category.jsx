import React from 'react'
import Widget from './Widget'
import { useDispatch, useSelector } from 'react-redux'
import { removeCategory, setIsOpen } from '../Redux/Slices/dashboardSlice';
import { setActiveCategory } from '../Redux/Slices/dashboardSlice';
import '../category.css'
import { MdDelete } from 'react-icons/md';

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
            <div className='px-5'>
                {categories.map((category) => (
                    <div key={category.category}>
                        <div className='flex items-center'>
                            <h2 className="text-lg font-bold mt-7">{category.category}</h2>
                            <button title='Delete Category' className='mt-7 ml-3 text-red-600' onClick={() => {
                                dispatch(removeCategory({categoryName:category.category}))
                            }}>
                                <MdDelete/>
                            </button>
                        </div>

                        <div className="widget-container rounded-xl  grid grid-cols-3 gap-4">
                            {category.widgets.filter((wid) => {
                                return wid.status === 'active';
                            }).map((widget) => (
                                <Widget key={widget?.name} widget={widget} category={category.category} />
                            ))}
                            <div className='bg-white p-4 py-10 rounded-lg shadow-lg w-[360px] flex justify-center items-center h-[14rem]'>
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
