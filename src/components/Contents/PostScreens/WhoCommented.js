import React, {useState, useEffect} from 'react'
import { app } from '../../../base'

const WhoCommented = ({id, createdBy}) => {
  const [theComment, setTheComment] = useState([])

  const viewTheComment = async() => {
    await app.firestore().collection("users").doc(createdBy).get().then(user => {
      setTheComment(user.data())
    })
  }

  useEffect(()=>{
    viewTheComment()
  }, [])

  return (
    <div>
      <div>
        {
          theComment.avatar ? (
            <img
              src={theComment && theComment.avatar}
              style={{
                width:"50px",
                height:"50px",
                borderRadius:"25px",
                objectFit:"cover",
                border:"2px solid purple"
              }}
            />
          ):(
            <div
            style={{
              width:"50px",
              height:"50px",
              borderRadius:"25px",
              display:"flex",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"tomato",
                border:"2px solid purple",
                fontWeight:"bold"
            }}
            > {theComment && theComment.first} </div>
          )
        }
      </div>
      <div>{theComment && theComment.name}</div>
    </div>
  )
}

export default WhoCommented
