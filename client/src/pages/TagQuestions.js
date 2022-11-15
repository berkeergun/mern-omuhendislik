import React, { useEffect } from "react";
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBBtn,MDBCardGroup,MDBContainer,MDBRow,MDBCol} from "mdb-react-ui-kit";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsByTag,setCurrentTagPage } from "../redux/features/questionSlice";
import omu from "../assets/images/omu.png"
import {excerpt} from "../utility/index"
import TagCardQuestion from "../components/TagCardQuestion";
import PaginationTag from '../components/PaginationTag';



function TagQuestions() {
const { tagQuestions, loading,currentTagPage,numberOfTagPages } = useSelector((state) => ({ ...state.question }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  // console.log(tagQuestions,currentTagPage,numberOfTagPages)
  let page = currentTagPage

  useEffect(() => {
    if(tag && page){
        dispatch(getQuestionsByTag({tag,page}))
    }
  }, [dispatch, page, tag])


  if(loading){
    return <Spinner />
  }
  
  return (
    // <div
    //   style={{
    //     margin: "auto",
    //     padding: "120px",
    //     maxWidth: "900px",
    //     alignContent: "center",
    //   }}
    // >
    <div style={{margin:"auto",padding:"15px",maxWidth:"1000px",alignContent:"center",marginTop:"75px"}}>

      {/* <h3 className="text-center" style={{color:"white",marginTop:"5px",border:"0px solid black",fontWeight:"bold"}}>Questions with tag: {tag}</h3> */}
      <h3 className="text-center" style={{color:"white",marginTop:"5px",border:"0px solid black",fontWeight:"bold"}}>{tag} Soruları</h3>
      
      <hr style={{color:"white" }} />
      {/* {tagQuestions &&
        // tagQuestions.slice(0).reverse().map((item) => (
        tagQuestions.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  
                <Link to={`/question/${item._id}`}>
                  <MDBCardImage
                      className="rounded"
                      src={item.imageFile ? item.imageFile : omu}
                      alt={item.title}
                      fluid
                      position="top" style={{width:"100%",height:"100%"}}
                    />
                </Link>
                  
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(item.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/question/${item._id}`)}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))} */}

        <MDBRow>
        <MDBCol style={{display:"flex",justifyContent:"center"}}>
          <MDBContainer style={{padding:"0px",margin:"10px"}}>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {/* {questions && questions.slice(0).reverse().map((item,index) => */}
              {tagQuestions && tagQuestions.map((item) =>
              <TagCardQuestion key={item._id} {...item} />
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        </MDBRow>
        {tagQuestions.length > 0 && (
        <PaginationTag
          setCurrentTagPage={setCurrentTagPage}
          numberOfTagPages={numberOfTagPages}
          currentTagPage={currentTagPage}
          dispatch={dispatch}
        />
      )}


    </div>
  )
}

export default TagQuestions