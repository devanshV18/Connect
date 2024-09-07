import React from 'react'
import logo from "../assets/logo.jpg"

const AuthLayouts = ({children}) => {
  return (
    <>
        <div>
          <div className='flex items-center justify-center'>
            <img src={logo} alt="logo" width={180} height={100} />
          </div>
          {children}
        </div>
    </>
  )
}

export default AuthLayouts
