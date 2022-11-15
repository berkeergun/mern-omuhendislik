import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt,excerptLower } from "../utility/index.js";
import omu from "../assets/images/omu.png"
import moment from "moment/min/moment-with-locales"

function RelatedQuestions({relatedQuestions,questionId}) {

    return (
        <>
          {relatedQuestions && relatedQuestions.length > 0 && (
            <>
              {relatedQuestions.length > 1 && <span style={{fontSize:"24px",fontWeight:"bold",textAlign:"center",border:"0px solid black",padding:"5px",borderRadius:"8px",color:"#fff",backgroundColor:"#203a43",boxShadow: "2px 5px 1px 1px #00000040",margin:"0px 24px 5px 24px"}}>Benzer Sorular</span>}
              <MDBRow className="row-cols-1 row-cols-md-3 g-4" style={{border:"0px solid black"}}>
                {relatedQuestions
                  .filter((item) => item._id !== questionId)
                  .splice(0, 3)
                  .map((item) => (
                    <MDBCol key={item._id} style={{border:"0px solid black",display:"flex",justifyContent:"center"}} >
                      
                      <MDBCard style={{border:"0px solid black",margin:"10px 5px",boxShadow: "2px 5px 1px 1px #00000040",maxWidth:"20rem",maxHeight:"25rem",borderRadius:"8px",backgroundColor:"#f7f0f1"}} 
                    className="h-100 mt-2 d-sm-flex hoverCard">

                        <Link to={`/question/${item._id}`} style={{height:"50%",display:"flex",justifyContent:"center",alignItems:"center",border:"0px solid black",overflow:"hidden",
                        // backgroundColor:"#00000010",
                        borderRadius:"8px"}}>

                          <MDBCardImage
                            // src={item.imageFile ? item.imageFile : omu}
                            src={item.imageFile[0]?.base64 ? item.imageFile[0]?.base64 : omu}
                            alt={item.title}
                            position="top"
                            style={{
                            // height:`${window.innerHeight/3}px`,
                            maxWidth:"100%",
                            borderRadius:"8px"

                          }}
                          />
                        </Link>
                        <div className='top-left'>{excerpt(item.name,20)}</div>
                        <span className="text-start tag-card">
                          {item.tags.map((tag,index) => (
                            <Link key={index} to={`/questions/tag/${tag}`}><span style={{margin:"1px",color:"#fff",backgroundColor:"#203a43"}} className="badge">{tag}</span></Link>
                          ))}
                        </span>
                        
                        <MDBCardBody className='cardoverflow'>
                          <MDBCardTitle className="text-start">
                          {excerpt(item.title, 20)}
                          </MDBCardTitle>
                          <MDBCardText className="text-start">
                            {excerptLower(item.description, 45)}
                            <Link to={`/question/${item._id}`}> Daha Fazla</Link>
                          </MDBCardText>
                        </MDBCardBody>
                        <span className='bottom-right'>{moment(item.createdAt).locale("tr").fromNow()}</span>

                      </MDBCard>
                      
                    </MDBCol>
                  ))}
              </MDBRow>
            </>
          )}
        </>
      );
}

export default RelatedQuestions