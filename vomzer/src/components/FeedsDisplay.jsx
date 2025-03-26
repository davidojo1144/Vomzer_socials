import React from 'react'
import { assets } from '../assets/assets'

const FeedsDisplay = () => {
  return (
    <>
      <div className=''>
        <div className='w-full md:w-[50%]'>
          <div>
              <div className='flex items-center space-x-60 justify-between pl-5'>
                <h3 className='text-md font-semibold'>Home</h3>
                <img src={assets.star} alt="" />
              </div>
              <div className="border-t  md:w-[220%] border-gray-300 my-7"></div>
              <div className='flex justify-normal space-x-3 items-center'>
                <img className='rounded-full w-5 h-5' src={assets.profilepic} alt="" />
                <p className='text-xs'>What's happening ?</p>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedsDisplay
