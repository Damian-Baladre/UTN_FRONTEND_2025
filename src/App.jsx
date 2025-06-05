import React from 'react'
import { Route, Routes} from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen.jsx/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import cors from 'cors'


const App = () => {
  return (
    
     <Routes>
      <Route path='/' element={<LoginScreen />}/>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route path='/home' element={<HomeScreen />}></Route>
     </Routes>
  )
}

export default App