import React, { useState, } from "react";
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { excerpt } from "../utility/index.js";

function DashboardCommentCard({ userComments }) {
  const [readMore, setReadMore] = useState(false);

  const handleShow = () => {
    setReadMore(!readMore);
  };

  return (
  <div className="dashboardCommentCard" key={userComments._id}>

    <div style={{border:"0px solid red",width:"100%",textAlign:"start",padding:"10px"}}>
      
      <Link to={`/question/${userComments.question}`} style={{float:"right",padding:"0px 5px"}}>
        {moment(userComments.createdAt).locale("tr").format("lll")}
      </Link>  

      {userComments?.description?.length <= 80 ? (
        <span style={{wordBreak:"break-word"}}>{userComments.description}</span>
      ) : (
        <span style={{wordBreak:"break-word"}}>
          {readMore === false
            ? excerpt(userComments.description, 80)
            : userComments.description}
          <span className="readMore" onClick={handleShow}>
            {readMore === false ? " Daha fazla" : " Daha az"}
          </span>
        </span>
      )}

      {/* <Link to={`/question/${item.question}`}>Soruya Git</Link> */}
      {/* <Link to={`/question/${item.question}`}>{item.createdAt}</Link> */}


    </div>
    
    
  </div>

  );
}

export default DashboardCommentCard;