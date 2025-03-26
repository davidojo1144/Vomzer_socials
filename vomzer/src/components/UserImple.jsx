import React from 'react'
import { assets, userimp } from '../assets/assets'

const UserImple = () => {
  return (
    <>
      <div className=' md:w-[25%] pt-10 md:pt-0 '>
        <div>
        <img className='w-10 animate-bounce cursor-pointer' src={assets.logo} alt="" />
          <div className='space-y-6 pt-5'>
            {
              userimp.map((user)=> (
                <div className='flex space-x-4 items-center' key={user.id}>
                  <img className='w-5' src={user.image} alt="" />
                  <p className='text-sm md:text-md font-semibold cursor-pointer'>{user.name}</p>
                </div>
              ))
            }
            <button className=' py-2 md:px-10 px-10 text-white bg-gradient-to-br from-blue-600 to-teal-500 rounded-full'>Vomzer</button>
          </div>
           <div className='flex items-center md:space-x-4 space-x-2 pt-8 md:pt-32'>
              <img className='w-7 h-7 rounded-full' src={assets.profilepic} alt="" />
              <div>
                <p className='text-xs font-semibold'>Jerome Bell</p>
                <p className='text-xs text-gray-600'>@gafonsoinocente</p>
              </div>
             <img src={assets.dots} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserImple
