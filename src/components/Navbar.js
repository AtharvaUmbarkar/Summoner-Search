import { React, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../css/Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className={`nav-menu ${menuOpen ? 'w-full' : 'w-0'} h-full  backdrop-blur-sm bg-opacity-70 bg-clrBackground-1`}>
        <div className='flex flex-row h-full w-full'>
          <div className='h-full w-1/2 bg-clrBackground-1 bg-opacity-100'>
            <ul className={`text-clrContent-0 mt-14 mx-4 space-y-2 text-sm flex flex-col justify-evenly items-start ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'} nav-menu-list`}>
              <Link to="/home" onClick={toggleMenu} className='w-full  hover:text-clrContent-3'>Home</Link>
              <Link to="/main_stats" onClick={toggleMenu} className='w-full  hover:text-clrContent-3'>Statistics</Link>
              <Link to="/match_history" onClick={toggleMenu} className='w-full  hover:text-clrContent-3'>Match History</Link>
              <Link to="/about" onClick={toggleMenu} className='w-full  hover:text-clrContent-3'>About</Link>
            </ul>
          </div>
          <div onClick={toggleMenu} className='h-full w-1/2'></div>
        </div>

      </div>
      <nav className='navbar nav-flex'>
        {!menuOpen ?
          <div className="nav-menu-button" onClick={toggleMenu}>
            <MenuRoundedIcon sx={{ color: '#7aa2f7' }} />
          </div>
          :
          <div className="nav-menu-button" onClick={toggleMenu}>
            <CloseRoundedIcon sx={{ color: '#7aa2f7' }} />
          </div>
        }
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
    </>
  )
}

export default Navbar