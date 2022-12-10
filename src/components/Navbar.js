import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className="navigation-bar">
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/">S4A</Link>
        </div>
        <div className="navigation-link">
          <NavLink to="/" activeclassname="active" className="nav-link">
            <p>Home</p>
          </NavLink>
          {/* <NavLink to="/series" activeclassname="active" className="nav-link">
            <p>Series</p>
          </NavLink> */}
          <NavLink to="/films" activeclassname="active" className="nav-link">
            <p>Films</p>
          </NavLink>
          <NavLink to="/mangas" activeclassname="active" className="nav-link">
            <p>Mangas</p>
          </NavLink>
        </div>
        <div className="search-bar">
          <div className="search-container">
            <input type="text" placeholder="Search a film, manga ..."/>
            <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
