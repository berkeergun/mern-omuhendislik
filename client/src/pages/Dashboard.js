import React,{useEffect, useState} from 'react'
// import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBBtn,MDBIcon,MDBCardGroup,} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux"
// import {Link} from "react-router-dom"
import {getQuestionsByUser,getCommentsByUser } from '../redux/features/questionSlice';
// import { deleteQuestion,getQuestionsByUser,getCommentsByUser } from '../redux/features/questionSlice';
// import omu from "../assets/images/omu.png"
import Spinner from '../components/Spinner';
// import {toast} from "react-toastify"
import {excerpt} from "../utility/index.js"
// import {excerpt,excerptLower} from "../utility/index.js"
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardProfile from '../components/DashboardProfile';
import DashboardQuestion from '../components/DashboardQuestion';
import DashboardComment from '../components/DashboardComment';
// import { Link } from 'react-router-dom';

function Dashboard() {
    const [changeDashboard,setChangeDasboard]=useState(2)
    const {user} = useSelector((state) => ({...state.auth}))
    const {userQuestions,loading,userComments,currentUserQuestionPage,currentUserCommentPage,numberOfUserQuestionPages,numberOfUserCommentPages} = useSelector((state) => ({...state.question}))
    const userId = user?.result?._id
    const dispatch = useDispatch()

    useEffect(() => {
      if(userId){
        if(changeDashboard === 0){
          dispatch(getQuestionsByUser({userId,currentUserQuestionPage}))
        }
        else if(changeDashboard === 1){
          dispatch(getCommentsByUser({userId,currentUserCommentPage}))
        }

        // dispatch(getQuestionsByUser({userId,currentUserQuestionPage}))
        // dispatch(getCommentsByUser({userId,currentUserCommentPage}))

      }
    }, [changeDashboard, currentUserCommentPage, currentUserQuestionPage, dispatch, userId])


    // console.log(userId)
    // console.log(userQuestions)
    // console.log(userComments)
    // console.log(user)

    // const handleDelete = (id) => {
    //     if(window.confirm("Soruyu silmek istediğine emin misin?")){
    //         dispatch(deleteQuestion({id,toast}))
    //         window.location.reload() 
    //         // buraya sonradan bak question silindiğinde usercommentsi yeniden düzenle redux
    //     }
    // }


    if(loading){
        return <Spinner />
    }

  return (
    <div className="dashboard">
        {userId && (
            <>
            <h5 className="text-center" style={{color:"white",marginTop:"5px",border:"0px solid black",fontWeight:"bold",wordBreak:"break-all"}}>{excerpt(user?.result?.name,24)}</h5>
            {/* <h4 className="text-center">Dashboard: {user?.result?.name}</h4> */}
            <hr style={{ color:"white" }} />
            </>
        )}
        <div style={{border:"0px solid black"}}>
            <button onClick= {changeDashboard !== 0 ? (() => setChangeDasboard(0)) : null } className="dashboardButton">Sorular</button>
            <button onClick= {changeDashboard !== 1 ? (() => setChangeDasboard(1)) : null } className="dashboardButton">Yorumlar</button>
            <button onClick= {changeDashboard !== 2 ? (() => setChangeDasboard(2)) : null } className="dashboardButton">Profil</button>
            {
              user?.result?.role === "admin" && (
                <button onClick= {changeDashboard !== 3 ? (() => setChangeDasboard(3)) : null }className="dashboardButton">Admin</button>
              )
            }
        </div>

        {
        changeDashboard === 0 ? userQuestions?.length === 0 ? <h3 style={{color:"#fff",marginTop:"10px"}}>Henüz sorunuz bulunmamaktadır.</h3> : userQuestions && 
        <DashboardQuestion
        changeDashboard={changeDashboard}
        userQuestions={userQuestions} 
        /> : null 
        }

        {changeDashboard === 1 ? userComments?.length === 0 ? <h3 style={{color:"#fff",marginTop:"10px"}}>Henüz yorumunuz bulunmamaktadır.</h3> : userComments && 
        <DashboardComment
        changeDashboard={changeDashboard}
        userComments={userComments} 
        /> : null }
        
        {changeDashboard === 2 ? 
        <DashboardProfile user={user} /> : null }

        {user?.result?.role === "admin" && changeDashboard === 3 ? 
        <DashboardAdmin/> : null }

    </div>
  )
}

export default Dashboard