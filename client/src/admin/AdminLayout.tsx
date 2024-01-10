import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <div className='flex gap-x-4 mt-5 mb-5 p-4'>
        <NavLink to ='/admin/dashboard' className='text-xl bg-red-200 block p-2 w-[10rem] text-center'>Dashboard</NavLink>
        <NavLink to ='/admin/product' className='text-xl bg-red-200 block p-2 w-[10rem] text-center'>Products</NavLink>
    </div>
    <Outlet />
    </>
  )
}

export default AdminLayout