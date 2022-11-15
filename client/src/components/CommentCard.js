import React,{useState,useEffect} from 'react'
import moment from "moment/min/moment-with-locales"
import {MDBBtn, MDBCard,MDBCardGroup,MDBIcon, MDBInput, MDBValidation} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux"
import { deleteComment, likeComment, updateComment } from '../redux/features/questionSlice';
import {toast} from "react-toastify"
import { useParams } from 'react-router-dom';
import { excerpt } from '../utility';

function CommentCard({description,createdAt,creator,_id,creatorId,likes}) {
  const initialState = {
    newDescription:`${description}`
  }
  const [commentData,setCommentData]= useState(initialState)
  const {userComments} = useSelector((state)=> ({...state.question}))
  const {user} = useSelector((state) => ({...state.auth}))
  const userId = user?.result?._id
  const userRole= user?.result?.role

  let {newDescription} = commentData

  useEffect(() => {
    if(_id){
        const singleComment= userComments.find((comment) => comment._id === _id);
        setCommentData({...singleComment})
    }
    }, [_id, userComments])

  // console.log(_id)
  // console.log(commentData)

  const dispatch = useDispatch()
  const {id} = useParams()
  
  // console.log(id)
  // console.log(_id)

  const handleDeleteComment = (question_id,comment_id) => {
    if(window.confirm("Yorumu silmek istediğine emin misin?")){
        dispatch(deleteComment({question_id,comment_id,toast}))
    }
  }

  const handleLikeComment = (question_id,comment_id) => {
        dispatch(likeComment({question_id,comment_id}))
  }

  const toggleShow = () => setBasicModal(!basicModal);
  const [basicModal, setBasicModal] = useState(false);


  const onInputChange = (e) => {
    let {name,value} = e.target;
    setCommentData({...setCommentData,[name]:value})
  }

  const handleClear= () => {
    setCommentData({newDescription:""})
  }

  const handleSubmit= (e) => {
    e.preventDefault();
    if(description ==="" || newDescription===""){
        // setTagErrMsg("Lütfen Yorum giriniz.")
        return null
    }
    if(description) {
        const updatedCommentData= {...commentData}
        // const updatedCommentData= {...commentData,updatedTime:new Date().toISOString()}
        // console.log(updatedCommentData)
        const comment_id = _id
        dispatch(updateComment({id,updatedCommentData,toast,comment_id}))
        //window.location.reload() // sıkıntı
    }
}
// hoverCard classname MDBCARD'a eklenebilir
const likeText = likes?.length > 0 ? `${likes?.length} Beğeni` : "Beğen"
const toastComp = () => {toast.warning("Beğenmek için giriş yapınız.");}

const [readMore, setReadMore] = useState(false);

const handleShow = () => {
  setReadMore(!readMore);
};

  return (

    <MDBCardGroup style={{border:"0px solid black",display:"flex",justifyContent:"center"}}>
        <MDBCard className='h-100 mt-2 d-sm-flex commentDescription' style={{
        backgroundColor:"#effdfd",
        // maxHeight:"25rem",
        width:"100%",borderRadius:"8px",boxShadow: "2px 5px 1px 1px #00000040",padding:"10px 10px 25px 10px"}} key={_id}>

          <span className='commentCreator' style={{wordBreak:"break-all"}}>
            {creator}
          </span>

            {description?.length <= 400 ? 
            (
              <span className='text-start commentDescription' style={{whiteSpace:"pre-wrap"}}>
              {description}
              </span>
            ): (
              <span className='text-start commentDescription' style={{whiteSpace:"pre-wrap"}}>
                {readMore === false
                  ? excerpt(description,  400)
                  : description}
                <span className="readMore" onClick={handleShow}>
                  {readMore === false ? " Daha fazla" : " Daha az"}
                </span>
              </span>
            )}
          
          

          <div style={{display: basicModal ? null : "none",border:"0px solid black",margin:"25px 0px 10px 0px"}}>
            <MDBValidation onSubmit={handleSubmit} noValidate>
              <MDBInput
              style={{backgroundColor:"#fff",height:"100px"}}
                label="Yorum/Cevap Güncelle"
                type="text"
                value={newDescription}
                name="description"
                onChange={onInputChange}
                className="form-control"
                textarea
                required
                invalid
                validation="Yorum/Cevap giriniz."
               />
               {/* {tagErrMsg} */}
               <div style={{float:"right",marginTop:"5px"}}>
                <MDBBtn style={{margin:"0px 3px"}} color='success'>Güncelle</MDBBtn>
                <MDBBtn onClick={handleClear} color='danger' style={{margin:"0px 3px"}}>Temizle</MDBBtn>
               </div>
            </MDBValidation>

          </div>

          <span className='commentMoment'>
              {moment(createdAt).locale("tr").fromNow()}
          </span>

          <span className='commentLike'>
          {userId && (
            <button onClick={()=>handleLikeComment(id,_id)} style={{background:"transparent",border:"0px",color:"none"}}>
              {
              likes?.includes(userId) 
              ?
              <><MDBIcon fas icon="thumbs-up" style={{color:"#203a43"}} />&nbsp;{likeText}</>
              :
              <><MDBIcon far icon="thumbs-up" style={{color:"#203a43"}} />&nbsp;{likeText}</>}
            </button>
          )}
          {!userId && (
            <button onClick={toastComp} style={{background:"transparent",border:"0px",color:"none"}}>
          <MDBIcon far icon="thumbs-up" style={{color:"#203a43"}} />&nbsp;{likeText}</button>
          )}
          </span>
          
          {userId === creatorId && (
            <>
            <button className='commentDelete' onClick={()=> handleDeleteComment(id,_id)}><MDBIcon fas icon='trash' style={{color:"#dd4b39"}} size="lg"/></button>
            <button className='commentUpdate' onClick={()=>toggleShow()}><MDBIcon fas icon='edit' style={{color:"#55acee"}} size="lg" /></button>
            </>
          )}

          {userRole === "admin" && (
            <>
            <button className='commentDelete' onClick={()=> handleDeleteComment(id,_id)}><MDBIcon fas icon='trash' style={{color:"#dd4b39"}} size="lg"/></button>
            <button className='commentUpdate' onClick={()=>toggleShow()}><MDBIcon fas icon='edit' style={{color:"#55acee"}} size="lg" /></button>
            </>
          )}

        </MDBCard>
    </MDBCardGroup>
  )
}

export default CommentCard