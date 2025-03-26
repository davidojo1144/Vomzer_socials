import React from 'react'
import { assets } from '../assets/assets'

const FeedsDisplay = () => {
  return (
    <>
      <div className=''>
        <div className='w-full pt-16 md:pt-0'>
          <div className=''>
              <div className='flex items-center space-x-60 justify-between pl-5'>
                <h3 className='text-md font-semibold'>Post and Feeds</h3>
                <img src={assets.star} alt="" />
              </div>
              <div className="border-t  md:w-[100%] border-gray-300 my-7"></div>
              <p className='text-sm'>New Post</p>
              <div className='flex justify-normal space-x-2 items-center'>
                <img className='absolute ml-5 rounded-full w-10 h-10' src={assets.profilepic} alt="" />
                <textarea className='w-full text-sm h-44 border-2 border-gray-200 pl-20'  name="" id="" placeholder='Whats on your mind ?'></textarea>
              </div>
              <div className=''>
                
                {/* <button className='py-1 px-4 text-white text-xs bg-gradient-to-br from-blue-600 to-teal-500 rounded-full ml-10'>Vomzer</button> */}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedsDisplay
