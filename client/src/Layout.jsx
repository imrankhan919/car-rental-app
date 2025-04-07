import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {
    return (
        <div className='flex-grow mt-14 mb-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout