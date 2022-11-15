import React, { useState } from 'react'
import { useSelector } from "react-redux";
import {MDBBtn, MDBInput, MDBValidation} from "mdb-react-ui-kit"
import {Link,useParams} from "react-router-dom"
import { addNewCommentToQuestion } from '../redux/features/questionSlice'
import {useDispatch,} from "react-redux"
import {toast} from "react-toastify"

const initialState = {
  description:"",
}

function CommentInput() {
  const [commentData,setCommentData]=useState(initialState)
  const {description} = commentData
  const [commentErrMsg,setCommentErrMsg] = useState(null)
  const dispatch = useDispatch()
  const {id} = useParams();
  const { user } = useSelector((state) => ({ ...state.auth }));

  // console.log(user)
  // console.log(id)

  if(!user){
    return <div style={{border:"0px solid black",marginBottom:"20px"}}>
      <Link to={"/login"}>
        <span className='loginForComment'>Yorum yapmak için giriş yapınız</span>
      </Link>
    </div>
  }

  const onInputChange = (e) => {
    let {name,value} = e.target;
    setCommentData({...commentData,[name]:value})
}

const handleSubmit= (e) => {
  e.preventDefault();

  if(!description.length){
    setCommentErrMsg("Lütfen boş yorum yapmayınız.")
  }
  if(description) {
      dispatch(addNewCommentToQuestion({id,commentData}))
      toast.success("Yorum başarıyla eklendi")
      // window.location.reload()
      // toast.success("Comment Added Successfully")
    }
}

  return (
    <div style={{margin:"10px 24px 0px 24px"}} >
      <MDBValidation onSubmit={handleSubmit}>
        
          <MDBInput
          style={{height:"75px",backgroundColor:"#fefefe",boxShadow: "2px 5px 1px 1px #00000040",marginBottom:"15px",minHeight:"50px"}} 
          label="Yorum/Cevap"
          type="text"
          value={description}
          name="description"
          onChange={onInputChange}
          className="form-control"
          required
          textarea
          invalid
          validation="Yorum/Cevap"
          />
          {commentErrMsg && <div className='tagErrMsg'>{commentErrMsg}</div>}

          <button className='commentButton'> Yorum Yap </button>

          {/* <MDBBtn className='commentButton' style={{backgroundColor:"#203a43"}} > Yorum Yap </MDBBtn> */}
      </MDBValidation>
        
    </div>
  )
}

export default CommentInput