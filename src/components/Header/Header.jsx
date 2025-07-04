import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'



const Header = () => {

  return (
    <div className="header-box">
      <div className='logo'>
      <img src="logoSlack.png" alt="" className="logo-slack-header" />
      </div>
      <div className='change-acount'>
        <Link to="/">
          <botton className='btt-change-acount'>Cambiar de cuenta</botton>
        </Link>
      </div>
    </div>
  )
}

export default Header