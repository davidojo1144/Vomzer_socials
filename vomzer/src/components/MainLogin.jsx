import React from 'react'

const MainLogin = ({currentState, setCurrentState}) => {
  return (
    <>
      <div>
        <div className='flex justify-center items-center text-center space-x-3 pt-4'>
            <p className='w-8 md:w-28 h-[1px] sm:h-[2px] bg-gray-700'></p>
            <p>Or</p>
            <p className='w-8 md:w-28 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
        <div className='flex flex-col space-y-3 pt-5 '>
            <input className='border-2 border-gray-800 py-1 pl-4 rounded-xl' type="text" placeholder='Username' required/>
            <input className='border-2 border-gray-800 py-1 pl-4 rounded-xl'  type="password" placeholder='Password'required/>
        </div>
        <button className='py-1  px-6 border-none border-teal-300  rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white hover:text-gray-300 ml-14 mt-3 '>Create account</button>
        <p className='pt-5 text-sm md:text-xl'>Already have an account ?</p> 
        <button className='py-1  px-6 border-2 border-teal-300 hover:border-none rounded-full hover:bg-gradient-to-br from-blue-600 to-teal-500 text-gray-500 hover:text-white ml-14 mt-2 '>Sign in</button>
      </div>
    </>
  )
}

export default MainLogin
