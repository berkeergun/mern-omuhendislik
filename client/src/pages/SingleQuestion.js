import React, { useEffect, useState } from "react";
import {MDBCard,MDBCardBody,MDBContainer,MDBCardText,MDBCardImage,MDBIcon,MDBBtn,MDBTooltip} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import moment from "moment/min/moment-with-locales"
import { deleteQuestion, getAllCommentsByQuestion, getQuestion, getRelatedQuestions } from "../redux/features/questionSlice";
import omu from "../assets/images/omu.png"
import Spinner from "../components/Spinner";
import RelatedQuestions from "../components/RelatedQuestions";
import CommentInput from "../components/CommentInput";
import {toast} from "react-toastify"
import {likeQuestion} from "../redux/features/questionSlice.js"
// import { excerpt } from "../utility/index.js";
import Comments from "../components/Comments";
// import CommentCard from "../components/CommentCard";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NotFound from "./NotFound";

function SingleQuestion() {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const { question,loading,relatedQuestions,comments,error } = useSelector((state) => ({ ...state.question }));
  const {user} = useSelector((state)=>({...state.auth}))
  const userId= user?.result?._id || user?.result?.googleId;
  let tags = question?.tags

  const [relatedCount,setRelatedCount]=useState(false)

  useEffect(() => {
    if (id) {
      setRelatedCount(false)
      dispatch(getQuestion(id));
      dispatch(getAllCommentsByQuestion(id));
      // console.log("first")
      // if(tags || !relatedQuestions){
      //   dispatch(getRelatedQuestions(tags))
      //   console.log("second")
      // }
    }

    if(tags && relatedCount === false){
      dispatch(getRelatedQuestions(tags))
      setRelatedCount(!relatedCount)
      console.log("second")
    }
  
  // }, [dispatch, id,tags]);
  }, [dispatch, id]);


  useEffect(() => {
    // tags && dispatch(getRelatedQuestions(tags))
    if(tags && relatedCount === false){
      dispatch(getRelatedQuestions(tags))
      setRelatedCount(!relatedCount)
      console.log("second")
    }

    // console.log(tags);

  }, [dispatch, relatedCount, tags]);
  
  // useEffect(() => {
  //   // tags && dispatch(getRelatedQuestions(tags))
  //   if(tags && relatedQuestions.length === 0){
  //     dispatch(getRelatedQuestions(tags))
  //     // console.log("second")
  //   }

  // }, [dispatch,tags]);

  // useEffect(() => {
  //   if(comments){
  //     dispatch(getAllCommentsByQuestion(id));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, id])

  // console.log(id)
  // console.log(comments)
  // console.log(comments)
  // console.log(question)
  // console.log(likesOfQuestion)
  // const image = question.imageFile ? question.imageFile[0].base64 : omu
  // src={image}

  const toastComp = () => {toast.warning("Beğenmek için giriş yapınız.");}

  const handleLike = async (id) => {
    await dispatch(likeQuestion(id))
    
    // await dispatch(getQuestion(id));

    // window.location.reload()
  }

  const handleDelete= async () => {
    if(window.confirm("Soruyu silmek istediğine emin misin?")){
      await dispatch(deleteQuestion({id,toast}))
      await navigate("/")
  }
}

  const Likes = () => {
    if (question?.likes?.length > 0) {
      return question.likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" style={{color:"#fff"}} />
          &nbsp;
          {question?.likes?.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`Sen ve diğer ${question?.likes?.length - 1} kişi beğendi.`}
            >
              {question?.likes?.length} Beğeni
            </MDBTooltip>
          ) : (
            `${question?.likes?.length} Beğen${question?.likes?.length > 1 ? "i" : "i"}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" style={{color:"#fff"}} />
          &nbsp;{question?.likes?.length} {question?.likes?.length === 1 ? "Beğeni" : "Beğeni"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" style={{color:"#fff"}} />
        &nbsp;Beğen
      </>
    );
  };

  if(!question || error){
    return <NotFound />
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <MDBContainer style={{border:"0px solid black",marginTop:"75px",}}>
      <MDBCard className="mb-3 mt-2 singleBack" style={{border:"0px solid black",backgroundColor:"#efefef",paddingBottom:"20px"}}>

        <div style={{display:"flex",justifyContent:"center",marginTop:"5px",}}>

        <Carousel showThumbs={false} dynamicHeight useKeyboardArrows showArrows emulateTouch infiniteLoop thumbWidth={0}>
         {question?.imageFile?.map((item, index)=> (
              <MDBCardImage
              key={index}
              position="top"
              style={{
              backgroundSize:'auto',maxWidth:"900px",maxHeight:"1200px" }}
              src={item?.base64 ? item?.base64 : omu}
              alt={question.title}
              />

          ))} 
        </Carousel>

        </div>
        
        <MDBCardBody>
          
          <div style={{border:"0px solid black",padding:"0px 0px",color:"#fff",boxShadow: "2px 5px 1px 1px #00000040",borderRadius:"8px",backgroundColor:"#203a43",margin:"10px 0px",
          display:"flex",
        }}>
            <div style={{border:"0px solid red",width:"100%",}}>

              <MDBBtn tag="span" color="none" style={{float:"left",border:"0px solid black",margin:"5px 0px 0px 0px",width:"100px",maxWidth:"100px"}} onClick={() => navigate(-1)} >
                <div style={{border:"0px solid yellow",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <MDBIcon fas style={{fontSize:"30px",color:"#fff",margin:"0px 10px"}} color="none" icon="long-arrow-alt-left" />
                </div>
              </MDBBtn>

              <MDBBtn style={{float:"right",color:"#fff",border:"0px solid black",margin:"7px 5px 0px 5px",width:"100px",maxWidth:"100px"}} tag="span" color='none' onClick={!user?.result ? toastComp : ()=>handleLike(id)}>
                  <Likes />
              </MDBBtn>

              <h3 style={{margin:"0px",padding:"3px"}}>
                {question?.title}
              </h3>

            </div>
          </div>
          
          <MDBCardText className="lead mb-0 text-start" style={{backgroundColor:"#2d505c",boxShadow: "2px 5px 1px 1px #00000040",color:"#fff",borderRadius:"8px",padding:"10px",whiteSpace:"pre-wrap"}}>
            {question?.description}
          </MDBCardText>

          <div style={{float:"right",border:"0px solid black",padding:"5px",borderRadius:"8px",backgroundColor:"#203a43",boxShadow: "2px 5px 1px 1px #00000040",marginTop:"10px",fontSize:"12px",display:"flex",flexDirection:"row",alignItems:"center"}}>

            <span style={{color:"#fff",fontSize:"12px",wordBreak:"break-all"}}>Oluşturan: {question?.name}</span>
            <span style={{color:"#fff",margin:"0px 5px"}}> | </span>
            <span style={{color:"#fff",fontSize:"12px"}}>{question && question.tags && question.tags.map((item) => `${item}`)}</span>
            <span style={{color:"#fff",margin:"0px 5px"}}> | </span>
            <i className="fas fa-calendar-alt" style={{color:"#fff",fontSize:"16px",margin:"5px"}}/>
            {/* <i className="far fa-clock" style={{color:"#fff",fontSize:"20px",margin:"5px"}}/> */}
            {/* <span style={{color:"#fff",fontSize:"12px"}}>{moment(question.createdAt).locale("tr").fromNow()}</span> */}
            <span style={{color:"#fff",fontSize:"12px"}}>{moment(question?.createdAt).locale("tr").format("lll")}</span>
            {user?.result?.role ==="admin" && (<button onClick={handleDelete} style={{margin:"0px 10px",border:"none",backgroundColor:"#dd4b39",color:"#fff",borderRadius:"4px"}}>Sil</button>)}
          </div>

        </MDBCardBody>

        <CommentInput/>

        <Comments comments={comments} />

        <RelatedQuestions relatedQuestions={relatedQuestions} questionId={id} />
        
      </MDBCard>
    </MDBContainer>
  );
}

export default SingleQuestion;
