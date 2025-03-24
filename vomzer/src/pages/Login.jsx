import React, { useState } from 'react'
import { assets } from '../assets/assets'


const Login = () => {

    const [currentState, setCurrentState] = useState("Sign Up")


  return (
    <>
      <div className='container pt-20 md:pt-40'>
        <div className='flex flex-col md:flex-row items-center justify-evenly'>
          <img className='animate-bounce md:w-[40%] w-[70%]' src={assets.logo} alt="" />
          <div>
            <div className='flex items-center space-x-5'>
              <p className='prata-regular text-current md:text-5xl text-2xl '>{currentState}</p>
              <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
            </div>
            <div className='pt-10 space-y-5'>
              <div>
                <img className='md:w-8 w-7 absolute ml-5 md:ml-5 mt-4 md:mt-4' src={assets.googlelogo} alt="" />
                <p className='text-sm md:text-xl font-medium md:w-[120%] w-[100%]   pl-16 py-4 border rounded-xl cursor-pointer border-gray-800 hover:text-gray-500 '>
                Sign in with Google
              </p>
              </div>
              <div>
                <img className='md:w-24 w-20 md:ml-0 ml- absolute' src={assets.facebooklogo} alt="" />
                <p className='text-sm md:text-xl font-medium md:w-[120%] w-[100%] pl-20 py-4 border rounded-xl text-white cursor-pointer hover:text-gray-200 border-blue-800 bg-blue-500'>
                Sign in with Facebook
              </p>
              </div>
              <div>
                <img className='md:w-7 w-8 md:ml-10 md:mt-4 mt-2 ml-5 absolute' src={assets.applelogo} alt="" />
                <p className='text-sm md:text-xl font-medium  md:w-[120%] w-[100%] pl-20 py-4 border hover:text-gray-300 rounded-xl text-white cursor-pointer  bg-black'>
                Sign in with Apple
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
