import React from 'react'
import { assets } from '../assets/assets'

const FeedsDisplay = () => {
  return (
    <>
      <div className=''>
        <div className='w-full pt-16 md:pt-0'>
          <div>
              <div className='flex items-center space-x-60 justify-between pl-5'>
                <h3 className='text-md font-semibold'>Home</h3>
                <img src={assets.star} alt="" />
              </div>
              <div className="border-t  md:w-[100%] border-gray-300 my-7"></div>
              <div className='flex justify-normal space-x-2 items-center'>
                <img className='rounded-full w-5 h-5' src={assets.profilepic} alt="" />
                <p className='text-xs'>What's happening ?</p>
              </div>
              <div className='flex items-center pt-5'>
                <div className='flex space-x-3'>
                  <img className='w-4 h-4' src={assets.home1} alt="" />
                  <img className='w-4 h-4' src={assets.home2} alt="" />
                  <img className='w-4 h-4' src={assets.home3} alt="" />
                  <img className='w-4 h-4' src={assets.home4} alt="" />
                  <img className='w-4 h-4' src={assets.home5} alt="" />
                </div>
                <button className='py-1 px-4 text-white text-xs bg-gradient-to-br from-blue-600 to-teal-500 rounded-full ml-10'>Vomzer</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedsDisplay
