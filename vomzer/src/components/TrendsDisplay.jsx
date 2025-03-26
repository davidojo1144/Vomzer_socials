import React from 'react'
import { assets, trendsData } from '../assets/assets'

const TrendsDisplay = () => {
  return (
    <>
      <div className='container'>
        <div className='mt-5 flex flex-col md:flex-row items-center justify-between'>
          <div className=' md:w-[30%]'>
            <div className='flex items-center mb-5 ' >
              <img className='absolute w-3 h-3 ml-3' src={assets.searchicon} alt="" />
              <input className='border border-gray-500 w-[100%] rounded-full bg-sky-100 pl-8 ' type="text" name="" id="" placeholder='Search' />
            </div>
            <div className='p-3 bg-sky-50 rounded-xl '>
              <h3 className='text-md font-bold'>What's happening</h3>
              <div className="border-t border-gray-300 my-2"></div>
              {
                trendsData.map((data)=> (
                  <div key={data.id} className='flex flex-col  items-center space-x-3 md:flex-row space-y-5'>
                    <div>
                      <div className='flex text-xs space-x-2'>
                        <p>{data.issue}</p>
                        <p>{data.time}</p>
                      </div>
                      <div className='flex space-x-1'>
                      <p className='text-xs font-semibold'>{data.report}</p>
                      <img className='w-10 h-10 rounded' src={data.image} alt="" />
                      </div>
                     <p className='text-xs font-light'>{data.text}</p>
                      <div className="border-t border-gray-300 my-2"></div>
                    </div>
                  </div>
                ))
              }
              <p className='text-sm text-sky-400 '>Show more</p>
            </div>
            <div className='p-3 bg-sky-50 rounded-xl mt-5'>
              <h3 className='text-md font-bold pt-2'>Who to follow</h3>
              <div className="border-t border-gray-300 my-2"></div>
              <div>
                <img src={assets.bessie} alt="" />
                <div>
                  <p></p>
                  <p></p>
                </div>
                <button></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrendsDisplay
