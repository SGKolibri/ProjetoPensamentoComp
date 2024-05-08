import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import Dashboard from './pages/dashboardPage'
import { RequireAuth } from 'react-auth-kit'

function App() {

  return (
    <Routes>
      <Route exact path="/*" element={<LoginPage />} />
      <Route className="App" path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
    </Routes >
  )
}

export default App;
