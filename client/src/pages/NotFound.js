import React from 'react'
import errorpng from "../assets/images/404.png"

function NotFound() {
  return (
    <div>
        <img src={errorpng} alt="Not Found" style={{marginTop:"50px"}} />
    </div>
  )
}

export default NotFound