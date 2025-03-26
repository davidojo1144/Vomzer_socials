import React from 'react'
import { assets, trendsData } from '../assets/assets'

const TrendsDisplay = () => {
  return (
    <>
      <div className='container'>
        <div className='mt-5 flex items-center justify-between'>
          <div className=' w-full'>
            <div className='flex items-center ' >
              <img className='absolute w-3 h-3 ml-3' src={assets.searchicon} alt="" />
              <input className='border border-gray-500 rounded-full bg-gray-100 pl-8 ' type="text" name="" id="" placeholder='Search' />
            </div>
            <div>
              <h1>What's happening</h1>
              {
                trendsData.map((data)=> (
                  <div key={data.id}>
                    
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrendsDisplay
