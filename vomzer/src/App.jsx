import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Footer from './components/Footer'
import MainLogin from './components/MainLogin'


const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/'  element={<Login/>}/>
        <Route path='/mainlogin'  element={<MainLogin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
