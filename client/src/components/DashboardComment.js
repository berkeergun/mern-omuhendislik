import React,{useEffect} from 'react'
import DashboardCommentCard from './DashboardCommentCard'
import {useDispatch,useSelector} from "react-redux"
import {getQuestionsByUser,getCommentsByUser, setCurrentUserQuestionPage, setCurrentUserCommentPage } from '../redux/features/questionSlice';
import PaginationUserComments from './PaginationUserComments';


function DashboardComment({changeDashboard}) {

    const {user} = useSelector((state) => ({...state.auth}))
    const {userComments,currentUserCommentPage,numberOfUserCommentPages} = useSelector((state) => ({...state.question}))
    const userId = user?.result?._id
    const dispatch = useDispatch()

    // useEffect(() => {
    //         dispatch(getCommentsByUser({userId,currentUserCommentPage}))
    //   }, [changeDashboard, currentUserCommentPage, dispatch, userId])

    // console.log(userComments)
    // console.log(changeDashboard)

    
    
  return (
    <div>
        
        {userComments.map((item,index) => <DashboardCommentCard userComments={item} key={index} /> ) }

        {userComments && <PaginationUserComments
        setCurrentPage={setCurrentUserCommentPage}
        numberOfPages={numberOfUserCommentPages}
        currentPage={currentUserCommentPage}
        dispatch={dispatch}
        changeDashboard={changeDashboard}
          />}
    
    </div>
  )
}

export default DashboardComment