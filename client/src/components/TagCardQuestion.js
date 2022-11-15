import React from 'react'
import {MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage,MDBCardGroup, MDBBtn, MDBIcon,MDBTooltip} from "mdb-react-ui-kit";
import {Link} from 'react-router-dom'
import omu from "../assets/images/omu.png"
import {excerpt,excerptLower} from "../utility/index.js"
import {useDispatch,useSelector} from "react-redux"
import {likeQuestion} from "../redux/features/questionSlice.js"
import {toast} from "react-toastify"
import moment from "moment/min/moment-with-locales"


function TagCardQuestion({imageFile,description,title,tags,_id,name,likes,createdAt}) {
    const {user} = useSelector((state)=>({...state.auth}))
    const userId= user?.result?._id || user?.result?.googleId;
    
    // const dispatch = useDispatch()

    // const toastComp = () => {
    //     toast.warning("Beğenmek için giriş yapınız.");
    // }
    // const handleLike= () => {
    //   dispatch(likeQuestion(_id))
    // window.location.reload()
    // }
    
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId) ? (
            <>
              <MDBIcon fas icon="thumbs-up" style={{color:"#203a43"}} />
              &nbsp;
              {likes.length > 2 ? (
                <MDBTooltip
                  tag="a"
                  title={`Sen ve diğer ${likes.length - 1} kişi beğendi.`}
                >
                  {likes.length} Beğeni
                </MDBTooltip>
              ) : (
                `${likes.length} Beğen${likes.length > 1 ? "i" : "i"}`
              )}
            </>
          ) : (
            <>
              <MDBIcon far icon="thumbs-up" style={{color:"#203a43"}} />
              &nbsp;{likes.length} {likes.length === 1 ? "Beğeni" : "Beğeni"}
            </>
          );
        }
        return (
          <>
            {/* <MDBIcon far icon="thumbs-up" style={{color:"#203a43"}} />
            &nbsp;Beğen */}
          </>
        );
      };

    

  return (
    <MDBCardGroup style={{border:"0px solid black",display:"flex",justifyContent:"center"}}>
        <MDBCard className='h-100 mt-2 d-sm-flex hoverCard' style={{maxWidth:"20rem",backgroundColor:"#f7f0f1",maxHeight:"25rem",borderRadius:"8px",boxShadow: "2px 5px 1px 1px #00000040"}}>

                <Link to={`/question/${_id}`} style={{height:"50%",display:"flex",justifyContent:"center",alignItems:"center",border:"0px solid black",overflow:"hidden",
                // backgroundColor:"#00000010",
                borderRadius:"8px"}}>

                    <MDBCardImage 
                    // src={image}
                    src={imageFile[0]?.base64 ? imageFile[0]?.base64 : omu}
                    alt={title} 
                    position="top" 
                    style={{maxWidth:"100%",borderRadius:"8px"}}/>
                </Link>
            <div className='top-left'>{excerpt(name,20)}</div>
            <span className='text-start tag-card'>
              
                {tags.map((tag,index)=> (
                    // <Link key={index} to={`questions/tag/${tag}`}><span style={{margin:"1px"}} className="badge bg-primary">{tag}</span></Link>
                    <span key={index} style={{margin:"1px",color:"#fff",backgroundColor:"#203a43"}} className="badge">{tag}</span>
                ))}

                <MDBBtn style={{position:"absolute",right:"10px",color:"#203a43"}} tag="span" color='none' 
                // onClick={!user?.result ? toastComp : handleLike}
                >
                {/* {!user?.result ? (
              <MDBTooltip title="Beğenmek için giriş yapınız." tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )} */}
            <Likes />
                </MDBBtn>
                </span>
            {/* <MDBCardBody> */}
            <MDBCardBody className='cardoverflow'>
                <MDBCardTitle className='text-start'>{excerpt(title, 20)}</MDBCardTitle>
                <MDBCardText className='text-start'>{excerptLower(description,45)}
                <Link to={`/question/${_id}`}> Read More</Link>
                </MDBCardText>
            </MDBCardBody>

            <span className='bottom-right'>{moment(createdAt).locale("tr").fromNow()}</span>

        </MDBCard>
    </MDBCardGroup>
  )
}

export default TagCardQuestion