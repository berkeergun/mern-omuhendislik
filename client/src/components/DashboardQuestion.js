import React,{useEffect} from 'react'
import DashboardQuestionCard from './DashboardQuestionCard'
import {useDispatch,useSelector} from "react-redux"
import {setCurrentUserQuestionPage } from '../redux/features/questionSlice';
import PaginationUserQuestions from './PaginationUserQuestions';


function DashboardQuestion({changeDashboard}) {

    const {user} = useSelector((state) => ({...state.auth}))
    const {userQuestions,currentUserQuestionPage,numberOfUserQuestionPages} = useSelector((state) => ({...state.question}))
    const userId = user?.result?._id
    const dispatch = useDispatch()
    // console.log(changeDashboard)

    // useEffect(() => {
    //         dispatch(getQuestionsByUser({userId,currentUserQuestionPage}))
    //   }, [changeDashboard, currentUserQuestionPage, dispatch, userId])

    // console.log(userQuestions)
    // console.log(changeDashboard)

  return (
    <div>
        {userQuestions.map((item,index) => <DashboardQuestionCard userQuestions={item} key={index}/> ) }

        {userQuestions && <PaginationUserQuestions
        setCurrentPage={setCurrentUserQuestionPage}
        numberOfPages={numberOfUserQuestionPages}
        currentPage={currentUserQuestionPage}
        dispatch={dispatch}
        
          />}
    </div>
  )
}

export default DashboardQuestion