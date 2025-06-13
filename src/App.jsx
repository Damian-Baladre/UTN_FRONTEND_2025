import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import AuthProtectRoute from './components/AuthProtectRoute/AuthProtectRoute'


const App = () => {
  return (

    <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route element={<AuthProtectRoute />}>
        <Route path='/home' element={<HomeScreen />}></Route>
      </Route>
    </Routes>
  )
}

export default App