import React from 'react'
import {MDBBtn,MDBIcon,} from "mdb-react-ui-kit";
import {Link} from "react-router-dom"
import omu from "../assets/images/omu.png"
import {excerpt,excerptLower} from "../utility/index.js"
import { deleteQuestion } from '../redux/features/questionSlice';
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import Spinner from './Spinner';

function DashboardQuestionCard({userQuestions}) {
    const {loading} = useSelector((state) => ({...state.question}))


    const dispatch = useDispatch()
    const handleDelete = (id) => {
        if(window.confirm("Soruyu silmek istediğine emin misin?")){
            dispatch(deleteQuestion({id,toast}))
            // window.location.reload()
        }
    }

    if(loading){
        return <Spinner />
    }

  return (
    <div key={userQuestions._id} className="dashboardCard">

        <Link to={`/question/${userQuestions._id}`} style={{display:"flex",justifyContent:"center",alignItems:"center",border:"0px solid black",overflow:"hidden",backgroundColor:"#efefbb10",borderRadius:"10px",height:"100px",margin:"5px 0px 5px 5px",padding:"5px",minWidth:"150px",maxWidth:"150px"}}>
            <img src={userQuestions?.imageFile[0]?.base64 ? userQuestions?.imageFile[0]?.base64 : omu} alt={userQuestions.title} style={{minWidth:"150px",maxWidth:"150px",borderRadius:"5px"}}  />
        </Link>

        <div style={{border:"0px solid black",display:"flex",flexDirection:"column",margin:"2px",alignItems:"center",maxWidth:"600px"}}>

            <h5 style={{fontWeight:"bold",wordBreak:"break-all"}}>{excerpt(userQuestions.title,25)}</h5>

            <Link to={`/questions/tag/${userQuestions.tags[0]}`} style={{wordBreak:"break-all"}}>
                <span className="badge" style={{margin:"1px",color:"#fff",backgroundColor:"#203a43",textAlign:"center",wordBreak:"break-all"}} >{userQuestions.tags}</span>
            </Link>

            <span style={{wordBreak:"break-word"}}>
                {excerptLower(userQuestions.description,45)}<Link to={`/question/${userQuestions._id}`}> Daha Fazla</Link>
            </span>
        </div>

        <div style={{border:"0px solid black",minWidth:"150px",maxWidth:"150px",width:"150px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <MDBBtn className='mt-1' tag="a" color="none" style={{border:"0px solid black",margin:"0px 5px"}}>
                <MDBIcon fas icon='trash' style={{color:"#dd4b39"}} size="lg" onClick={() => handleDelete(userQuestions._id)} />
            </MDBBtn>

            <Link to={`/editQuestion/${userQuestions._id}`} style={{border:"0px solid black",margin:"0px 5px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <MDBIcon fas icon='edit' style={{color:"#55acee"}} size="lg" />
            </Link>
        </div>

    </div>
  )
}

export default DashboardQuestionCard