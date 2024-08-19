import { useState } from 'react'
import DashboardHeader from './components/DashboardHeader'
import DashTitle from './components/DashTitle'
import Category from './components/Category'
import { useDispatch } from 'react-redux'
import { addCategory, addWidget, removeCategory, removeWidget } from './Redux/Slices/dashboardSlice'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='relative'>
      <DashboardHeader />
      <DashTitle />
      <Sidebar />
      <Category />
    </div>
  )
}

export default App
