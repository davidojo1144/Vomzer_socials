import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Footer from './components/Footer'
import MainLogin from './components/MainLogin'
import Feeds from './pages/Feeds'


const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/'  element={<Login/>}/>
        <Route path='/mainlogin'  element={<MainLogin/>}/>
        <Route path='/feeds'  element={<Feeds/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
