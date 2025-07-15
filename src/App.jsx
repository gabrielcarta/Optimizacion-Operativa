import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MetodoGrafico from './pages/MetodoGrafico'
import MenuRadial from './components/MenuRadial'
import GeneradorTabla from './components/GeneradorTabla'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MenuRadial />} />
        <Route path="/grafico" element={<MetodoGrafico />} />
        <Route path="/generador" element={<GeneradorTabla />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
