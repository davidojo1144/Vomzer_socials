import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-gradient-to-br from-blue-600 to-teal-500 mt-20 '>
        <div className='container pt-16 pb-16'>
            <div className='flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-3 cursor-pointer'>
                <p className='text-white hover:text-gray-400'>About</p>
                <p className='text-white hover:text-gray-400'>Download the V app</p>
                <p className='text-white hover:text-gray-400'>Help Centre</p>
                <p className='text-white hover:text-gray-400'>Cookie Policy</p>
                <p className='text-white hover:text-gray-400'>Marketing</p>
                <p className='text-white hover:text-gray-400'>Developers</p>
                <p className='text-white hover:text-gray-400'>Settings</p>
                <p className='text-white hover:text-gray-400'>© 2025 V Corp.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer
