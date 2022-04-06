import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import '../css/Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar nav-flex'>
      <div className='nav-logo'>
        <Link to='/home'>
        <img src={process.env.PUBLIC_URL + '/icon.png'} alt="logo not found" />
        </Link>
      </div>
      <div className='nav-title'>
        <div>Summoner Search</div>
      </div>
      <ul className="nav-list">
        <NavLink to="/home" className={({ isActive }) => (isActive ? "nav-item nav-item-active" : "nav-item")} >
          <li className='nav-home' >Home</li>
        </NavLink>
        <NavLink to="/main_stats" className={({ isActive }) => (isActive ? "nav-item nav-item-active" : "nav-item")}>
          <li className='nav-statistics' >Statistics</li>
        </NavLink>
        <NavLink to="/match_history" className={({ isActive }) => (isActive ? "nav-item nav-item-active" : "nav-item")}>
          <li className='nav-match-history' >Match History</li>
        </NavLink>
      </ul>
    </nav >
  )
}

export default Navbar