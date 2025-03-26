import React from 'react'
import UserImple from '../components/UserImple'
import FeedsDisplay from '../components/FeedsDisplay'
import TrendsDisplay from '../components/TrendsDisplay'

const Feeds = () => {
  return (
    <>
      <div>
        <div className='container'>
            <div className='flex flex-col md:flex-row'>
                <FeedsDisplay/>
                <TrendsDisplay/>
                <UserImple/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Feeds
