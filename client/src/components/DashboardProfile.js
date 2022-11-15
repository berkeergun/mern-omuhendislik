import React from 'react'
import {Link} from "react-router-dom"

function DashboardProfile({user}) {
    // console.log(user)
  return (
    <div style={{marginTop: "10px",border:"0px solid yellow",display:"flex",justifyContent:"center",color:"white"}}>
            <div style={{width:"50%",border:"0px solid yellow",wordBreak:"break-all"}}>
                <div>
                    <span style={{letterSpacing:"1px"}}>Name</span>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <hr style={{width:"25%",margin:"0px",padding:"0px",color:"#fefefe",height:"2px"}} />
                    </div>
                    <span>{user.result.name}</span>
                </div>
                <hr />
                <div>
                    <span style={{letterSpacing:"1px"}}>E-Mail</span>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <hr style={{width:"25%",margin:"0px",padding:"0px",color:"#fefefe",height:"2px"}} />
                    </div>
                    <span>{user.result.email}</span>
                </div>
                <hr />
                <div style={{marginTop:"10px",border:"0px solid black",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Link to={"/resetPassword"} className="dashboardResetPassword">Şifreni Yenile</Link>
                </div>
            </div>
    </div>
  )
}

export default DashboardProfile