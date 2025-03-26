import React from 'react'
import { assets, trendsData } from '../assets/assets'

const TrendsDisplay = () => {
  return (
    <>
      <div className='container'>
        <div className='mt-5 flex items-center justify-between'>
          <div className=' w'>
            <div className='flex items-center mb-5 ' >
              <img className='absolute w-3 h-3 ml-3' src={assets.searchicon} alt="" />
              <input className='border border-gray-500 rounded-full bg-sky-100 pl-8 ' type="text" name="" id="" placeholder='Search' />
            </div>
            <div className='p-3 bg-sky-50 rounded-xl w-full'>
              <h3 className='text-md font-semibold '>What's happening</h3>
              <div className="border-t border-gray-300 my-2"></div>
              {
                trendsData.map((data)=> (
                  <div key={data.id} className='flex flex-col items-center space-x-3 md:flex-row space-y-5'>
                    <div>
                      <div className='flex text-xs space-x-2'>
                        <p>{data.issue}</p>
                        <p>{data.time}</p>
                      </div>
                      <p className='text-xs font-medium'>{data.report}</p>
                      <p className='text-xs '>{data.text}</p>
                      <div className="border-t border-gray-300 my-2"></div>
                    </div>
                    <img className='w-10 h-10 rounded' src={data.image} alt="" />
                  </div>
                ))
              }
              <p className='text-sm text-sky-400'>Show more</p>
            </div>
            <div>
              <h3>Who to follow</h3>
              <div className="border-t border-gray-300 my-2"></div>
              <div>
                <img src="" alt="" />
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
