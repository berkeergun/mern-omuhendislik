import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux"
import { getAllUsers,deleteUserById,getUserById, blockUser, getUserBySearch } from "../redux/features/authSlice";
import {toast} from "react-toastify"
import Spinner from "./Spinner";
import {useNavigate} from "react-router-dom"
import {excerpt} from "../utility/index.js"

function DashboardAdmin() {
    const {user,adminAllUsers,adminUser,loading} = useSelector((state) => ({...state.auth}))
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const [readMore, setReadMore] = useState(false);
    // console.log(user)

    // useEffect(() => {
    //   if(user?.result?.role ==="admin"){
    //     dispatch(getAllUsers())
    //   }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // console.log(user)

    const handleDelete = (id) => {
        if(window.confirm("Soruyu silmek istediğine emin misin?")){
            dispatch(deleteUserById({id,toast}))
            // window.location.reload()
        }
    }

    const handleBlock = async (id) => {
        if(window.confirm("Soruyu silmek istediğine emin misin?")){
            await dispatch(blockUser({id,toast}))
            
            //yanlış ama olsun bakılacak
            await dispatch(getAllUsers())

            // window.location.reload()
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(search){
        dispatch(getUserBySearch(search))
        setSearch("")
      }else{
        return null
      }
    }
    
    if(loading){
        return <Spinner/>
    }

  return (
    <div style={{marginTop: "10px"}}>
      <h3 style={{ color: "#fff",  }}>Admin Paneli</h3>

      <button onClick={()=>dispatch(getAllUsers())} className="dashboardResetPassword" style={{marginBottom:"10px",width:"30%"}}>Tüm Kullanıcıları Gör</button>

      <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          // className="form-control"
          className="search-input"
          placeholder="Kullanıcı Ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
      </form>

      <div style={{border:"0px solid white",width:"100%",color:"#fff",marginTop:"10px"}}>
        <table style={{width:"100%"}}>
          <thead>
            <tr style={{border:"5px solid white"}}>
              <th>İsim</th>
              <th>Email</th>
              <th>Role</th>
              <th>Blocked?</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
          {adminAllUsers?.map((item,key)=>
            <tr key={key} style={{borderBottom:"1px solid white",flex:"1"}}>
              <td style={{wordBreak:"break-word",flex:"2"}}>{excerpt(item.name,15)}</td>
              <td style={{wordBreak:"break-word",flex:"2"}}>{excerpt(item.email,15)}</td>
              <td style={{wordBreak:"break-word",flex:"2"}}>{item.role}</td>
              <td style={{wordBreak:"break-word",flex:"2"}}>{String(item.blocked)}</td>
              <td>
              <button style={{backgroundColor:"red",margin:"5px",color:"#fff",border:"0px",borderRadius:"5px"}} onClick={()=>handleDelete(item._id)}>Sil</button>
              <button style={{backgroundColor:"purple",margin:"5px",color:"#fff",border:"0px",borderRadius:"5px"}} onClick={()=>handleBlock(item._id)}>Blockla</button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      


    </div>
  );
}

export default DashboardAdmin;
