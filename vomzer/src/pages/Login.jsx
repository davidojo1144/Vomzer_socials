import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const Login = () => {

    const [currentState, setCurrentState] = useState("Sign Up")


  return (
    <>
      <div className='container pt-40'>
        <div className='flex items-center justify-between'>
          <img className='animate-bounce' src={assets.logo} alt="" />
          <div>
            <div className='text-5xl font-bold'>
              <Title text1={currentState} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
