import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { app } from '../../base'
import WhoPosted from './PostScreens/WhoPosted'

const HomeScreen = () => {

  const [post, setPost] = useState([])


  const viewPost = async() => {
    await app.firestore().collection("post").onSnapshot(snapshot => {
      const r = []
      snapshot.forEach(doc => {
        r.push({...doc.data(), id: doc.id})
      })
      setPost(r)
    })
  }

  useEffect(()=>{
    viewPost()
  }, [])

  return (
    <div
    style={{
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      marginTop:"50px"
    }}
    >
   
        
         {
           post.map(({coverImage, amount, brife, createdBy, id, detail, title, createdAt})=>(
             <div key={id} 
             style={{
              width:"300px",
              height:"500px",
              borderRadius:"10px",
              margin:"10px",
              // backgroundColor:"red"
             }}
             > 
             <WhoPosted
              id={id} createdBy={createdBy} createdAt={createdAt}
             />
             <Link 
             to={`/post/${id}`}
             >
              
             <img
                src={coverImage}
                alt={title}
                style={{
                  width:"100%",
                  height:"300px",
                  objectFit:"cover",
                  borderRadius:"10px 10px 0 0"
                }}
                  />
             </Link>
                <div
                style={{
                  backgroundColor:"lightblue",
                  borderRadius:"0 0 10px 10px ",
                  paddingBottom:"10px"
                  
                }}
                > 
                    
                <div
                style={{
                  fontWeight:"bold",
                  fontSize:"16px",
                  textTransform: "uppercase",
                  padding:"0px 10px"
                }}
                >{title}</div>

                <div
                style={{
                  fontWeight:"bold",
                  fontSize:"13px",
                  // textTransform: "uppercase",
                  padding:"0px 10px"
                }}
                >Amount to be Raised: #{amount}</div>

                <div
                style={{
                 fontSize:"13px",
                 marginBottom:"20px",
                  padding:"10px 10px"
                }}
                >{brife}</div>
                   </div>
              </div>
           ))
         }
        </div>
        
    
   
  )
}

export default HomeScreen
