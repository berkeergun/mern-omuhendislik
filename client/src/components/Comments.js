import React from 'react'
import CommentCard from './CommentCard'


function Comments({comments}) {
  // console.log(comments)

  return (
    <>
    {comments && (
      <div style={{display:"flex",flexDirection:"column",border:"0px solid black",margin:"10px 24px"}}>
      {comments.slice(0).reverse().map((item)=> <CommentCard key={item._id} {...item} />)}
      </div>
    )}
    </>
  )
}

export default Comments