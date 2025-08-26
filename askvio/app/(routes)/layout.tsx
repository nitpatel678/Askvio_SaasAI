import React from 'react'
import AppHeader from './_components/Appheader'
import Footer from '../_components/Footer'
import FAQ from '../_components/FAQ'

function DashboardLayout({children}:any) {
  return (
    <div>
        <AppHeader />
        {children}
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default DashboardLayout