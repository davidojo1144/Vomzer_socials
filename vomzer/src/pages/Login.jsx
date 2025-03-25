import React, { useState } from 'react'
import { assets } from '../assets/assets'



const Login = () => {

    const [currentState, setCurrentState] = useState("Sign Up")


  return (
    <>
      <div className='container pt-20 md:pt-40'>
        <div className='flex flex-col md:flex-row items-center justify-evenly'>
          <img className='animate-bounce md:w-[40%] w-[70%]' src={assets.logo} alt="" />
          <div className=''>
            <div className='flex items-center justify-center mt-10 md:mt-0 space-x-5'>
              <p className='prata-regular text-center md:text-5xl text-2xl '>{currentState}</p>
              <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
            </div>
            <div className='pt-10 space-y-3'>
              <div className='flex items-center space-x-8 border-2 border-gray-400 rounded-xl px-7 py-2 cursor-pointer hover:text-gray-500 '>
                <img className='w-5' src={assets.googlelogo} alt="" />
                <p className=''>
                Sign in with Google
              </p>
              </div>
              <div className='flex items-center space-x-8 border-2 bg-blue-500 rounded-xl px-7 py-2 cursor-pointer '>
                <img className='w-5' src={assets.facebooklogo} alt="" />
                <p className='text-white hover:text-gray-200 '>
                Sign in with Facebook
              </p>
              </div>
              <div className='flex items-center space-x-8 border-2 rounded-xl px-7 py-2 cursor-pointer bg-black '>
                <img className='w-5' src={assets.applelogo} alt="" />
                <p className='text-white hover:text-gray-200 '>
                Sign in with Apple
              </p>
              </div>
              <div className='flex justify-center items-center text-center space-x-3 pt-4'>
                <p className='w-8 md:w-28 h-[1px] sm:h-[2px] bg-gray-700'></p>
                <p>Or</p>
                <p className='w-8 md:w-28 h-[1px] sm:h-[2px] bg-gray-700'></p>
              </div>
              <div className='flex flex-col space-y-3 pt-5 '>
                <input className='border-2 border-gray-800 py-1 px-10 rounded-xl' type="text" placeholder='Username' required/>
                <input className='border-2 border-gray-800 py-1 px-10 rounded-xl'  type="password" placeholder='Password'required/>
              </div>
              <button className='py-1  px-6 border-2 border-teal-300 hover:border-none rounded-full hover:bg-gradient-to-br from-blue-600 to-teal-500 text-gray-500 hover:text-white ml-14 '>Create Account</button> 
            </div>
          </div>
        </div>
        <p className='text-center text-sm pt-10'>By signing up, you agree to the Terms of Service and Privacy <br/>Policy, including Cookie Use.</p>
      </div>
    </>
  )
}

export default Login
