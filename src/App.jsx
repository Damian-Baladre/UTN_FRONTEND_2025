import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import WorkspaceScreen from './Screens/WorkspaceScreen/WorkspaceScreen'
import AuthProtectRoute from './components/AuthProtectRoute/AuthProtectRoute'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route element={<AuthProtectRoute />}>
        <Route
          path='/home'
          element={<HomeScreen />}
        />
        <Route
          path='/new'
          element={<NewWorkspaceScreen />}
        />
        <Route
          path='/workspace/:workspace_id'
          element={<WorkspaceScreen />}
        />
        <Route
          path='/workspace/:workspace_id/channels/:channel_id'
          element={<WorkspaceScreen />}
        />
      </Route>
    </Routes>
  )
}

export default App