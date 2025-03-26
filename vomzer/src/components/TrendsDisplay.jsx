import React from 'react'
import { assets, trendsData } from '../assets/assets'

const TrendsDisplay = () => {
  return (
    <>
          <div className='md:w-[32%]'>
            <div className='flex items-center mb-5 ' >
              <img className='absolute w-3 h-3 ml-3' src={assets.searchicon} alt="" />
              <input className='border border-gray-500 w-[100%] rounded-full bg-white pl-8 ' type="text" name="" id="" placeholder='Search' />
            </div>
            <div className='p-3 bg-white rounded-xl '>
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
              <p className='text-sm text-teal-400 cursor-pointer'>Show more</p>
            </div>
            <div className='p-3 bg-white rounded-xl mt-5'>
              <h3 className='text-md font-bold pt-2'>Who to follow</h3>
              <div className="border-t border-gray-300 my-2"></div>
              <div>
              <div className='flex items-center md:space-x-2 space-x-5'>
                <img className='w-7 h-7' src={assets.bessie} alt="" />
                <div>
                  <p className='text-xs font-semibold'>Bessie Cooper</p>
                  <p className='text-xs text-gray-600'>@alessandroveronezi</p>
                </div>
                <button className='text-sky-400 py-0.5 px-2 border font-semibold text-xs border-sky-400 rounded-full hover:text-white hover:bg-sky-400 transition'>Follow</button>
              </div>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className='flex items-center md:space-x-2 space-x-5'>
                <img className='w-7 h-7' src={assets.jenny} alt="" />
                <div>
                  <p className='text-xs font-semibold'>Jenny Wilson</p>
                  <p className='text-xs text-gray-600'>@gabrielcantarin</p>
                </div>
                <button className='text-sky-400  py-0.5 px-2 border font-semibold text-xs border-sky-400 rounded-full hover:text-white hover:bg-sky-400 transition'>Follow</button>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <p className='text-sm text-sky-400 cursor-pointer'>Show more</p>
            </div>
            <p className='text-xs font-light pt-4'>Terms of Service Privacy Policy Cookie Policy <br/>Ads info More © 2025 V Corp.</p>
          </div>
        
    </>
  )
}

export default TrendsDisplay
