import React from 'react'

export const Navbar = ({title}) => {
 
  
  return (
  
   <nav >
   <h1>{title}</h1>
   </nav> 
  )
}

Navbar.defaultProps = {
  title: "Default Title"
}
