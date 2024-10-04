import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, SingleProducts } from '../pages'

function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:id' element={<SingleProducts/>} />
    </Routes>
  )
}

export default Routers
