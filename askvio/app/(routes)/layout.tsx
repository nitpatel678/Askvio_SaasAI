import React from 'react'
import AppHeader from './_components/Appheader'

function DashboardLayout({children}:any) {
  return (
    <div>
        <AppHeader />
        {children}
    </div>
  )
}

export default DashboardLayout