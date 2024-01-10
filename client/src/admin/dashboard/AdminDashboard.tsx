import React from 'react'

const AdminDashboard = () => {
    const users = 10;
    const orders = 20;
    const products = 50;
  return (
    <>
    <div className='p-4 text-xl'>
    <div>Total number of users logged in ecommerce : {users} </div>
    <div>Total number of orders in ecommerce : {orders} </div>
    <div>Total number of products in ecommerce : {products} </div>
    </div>
    </>
  )
}

export default AdminDashboard