import React from 'react'
import AppHeader from './_components/Appheader'
import Footer from '../_components/Footer'

function DashboardLayout({children}:any) {
  return (
    <div>
        <AppHeader />
        {children}
        <Footer/>
    </div>
  )
}

export default DashboardLayout