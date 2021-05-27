import React, {useState, useEffect} from 'react'
import { app } from '../../../base'
import moment from "moment"

const WhoPosted = ({id, createdBy, createdAt}) => {

  
  const [post, setPost] = useState([])


  const viewPost = async() => {
    await app.firestore().collection("users").doc(createdBy).get()
    .then((user)=>(
      setPost(user.data())
    ))
  }

  useEffect(()=>{
    viewPost()
  }, [])


  return (
    <div
    style={{
      display:"flex",
      marginBottom:"10px"
    }}
    >
      <div>
       {
         !post.avatar ? (
           <div
           style={{
            width:"50px",
            height:"50px",
            borderRadius:"25px",
            border:"2px solid purple",
            backgroundColor:"tomato",
            fontWeight:"bold",
            justifyContent:"center",
            alignItems:"center",
            display:"flex",
            textTransform: "uppercase"
          }}
           >{post && post.first}</div>
         ):(
          <img  
          src={post && post.avatar}
          style={{
            width:"50px",
            height:"50px",
            borderRadius:"25px",
            objectFit:"cover",
            border:"2px solid purple",
          }}
          />
         )
       }
      </div>
      <div
      style={{
        marginLeft:"10px"
      }}
      >
      <div>{post && post.name}</div>
      <div
      style={{
        fontWeight:"bold", fontSize:"10px"
      }}
      >{moment(createdAt.toDate()).fromNow()}</div>
      </div>
    </div>
  )
}

export default WhoPosted
