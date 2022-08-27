import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../config/routes'

function Navbar() {
  return (
    <nav style={{width:"100%", backgroundColor:"#121212", heigth:"20vh"}}>
      <ul style={{display:"flex"}}>
        {routes.map((route) => (
          <li style={{listStyle:"none", margin:"1em"}}>
            <Link to={route.path} style={{backgroundColor:"yellow", borderRadius:"5px", padding:".5em"}}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar