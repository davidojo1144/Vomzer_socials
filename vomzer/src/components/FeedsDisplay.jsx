import React from 'react'
import { assets } from '../assets/assets'

const FeedsDisplay = () => {
  return (
    <>
      <div>
        <div className='w-full bg-purple-500'>
          <div>
            <div>
              <div className='flex items-center justify-between pl-5'>
                <h3 className='text-md font-semibold'>Home</h3>
                <img src={assets.star} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedsDisplay
