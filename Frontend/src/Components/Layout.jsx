import React from 'react'
import './layout.css'

function Layout({children}) {
  return (
    <main className='container'>{children}</main>
  )
}

export default Layout
