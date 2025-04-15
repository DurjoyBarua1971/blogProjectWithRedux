import React from 'react'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <div className="bg-[#fffbf5] h-screen max-w-xl mx-auto">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}