import React from 'react'
import { Outlet } from 'react-router'

function Main() {
  return (
    <main className='bg-header vh-100'>
      <Outlet />
    </main>
  )
}

export default Main