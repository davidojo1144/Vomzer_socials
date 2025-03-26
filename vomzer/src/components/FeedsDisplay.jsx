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
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedsDisplay
