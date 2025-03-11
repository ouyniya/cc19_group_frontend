import React from 'react'
import { Outlet } from 'react-router'

function LayoutUser() {
  return (
    <>
        <div className="flex min-h-screen bg-base-200">
            side menu
            <Outlet />
        </div>
    </>
  )
}

export default LayoutUser