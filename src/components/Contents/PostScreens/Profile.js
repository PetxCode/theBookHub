import { Button, Input } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { app } from '../../../base'

const Profile = () => {
  const hist = useHistory()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [holder, setHolder] = useState([])
 const [toggle, setToggle] = useState(false)

 const handleToggle = () => {
   setToggle(!toggle)
 }

 const uploadImage = async(e) => {
  const file = e.target.files[0]
  const storageRef = app.storage().ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)
  setAvatar(await fileRef.getDownloadURL())
}

  const finalUpdate = async() => {

    const userProfile = await app.auth().currentUser

    if(userProfile){
  await app.firestore().collection("users").doc(userProfile.uid).update({
    name,
    bio,
    first: name.charAt(0),
    avatar
  })
  hist.push('/')
    }  
  }

  const viewUser = async() => {
    const userProfile = await app.auth().currentUser

    if(userProfile){
      await app.firestore()
      .collection("users")
      .doc(userProfile.uid)
      .get()
      .then((user)=>{
        setHolder(user.data())
        // console.log(holder.name)
      })
    }
  }

  useEffect(()=>{
    viewUser()
  }, [])

  return (
   <div style={{
     display:"flex",
      justifyContent:"center",
      flexWrap:"wrap",
      marginTop:"50px",
      flexDirection:"column",
      alignItems:"center"
   }} >
      <div>
      This is the Profile Page
    </div>

<div
style={{
  display:"flex",
  justifyContent:"center",
  flexWrap:"wrap",

}}
>
  <div
  style={{
      width:"300px",
      backgroundColor:"lightblue",
      margin:"20px",
      borderRadius:"10px"

  }}
  > 
    <div
    style={{
      width:"100%",
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center",
      marginTop:"10px",
      marginBottom:"10px",
    }}
    >
     <div>
     {
       !holder.avatar ? (
         <img
          src={holder && holder.avatar}
          alt={holder && holder.name}
          style={{
            display:"flex",
           width:"80px",
           height:"80px",
           borderRadius:"40px",
           justifyContent:"center",
           alignItems:"center",
           backgroundColor: "pink",
           border: "2px solid white",
           objectFit:"cover"
          }}
         /> 
       ):(
         <div 
         style={{
           display:"flex",
           width:"80px",
           height:"80px",
           borderRadius:"40px",
           justifyContent:"center",
           alignItems:"center",
           backgroundColor: "tomato",
           border: "2px solid white",
           fontWeight:"bold",
           fontSize:"20px"
         }}
         > {holder && holder.first} </div>
       )
     }
     </div>
       <div> {holder && holder.name} </div>
    </div>
    <br/>
    
     <div
      style={{
        marginBottom:"20px",
        display:"flex",
        justifyContent:"center",
        width:"300px"
      }}
     >
     {
       toggle ? (
        <Button
        onClick={()=>{
         handleToggle()
        }}
         >Undo</Button>
       ) : (<Button
        onClick={()=>{
         handleToggle()
        }}
         >Edit Profile</Button>)
     }
     </div>
   </div>

{
  toggle ? (  
    <div
    style={{
      width:"300px",
      backgroundColor:"lightblue",
      margin:"20px",
      borderRadius:"10px"
  
  }}
    > 
  
    <div
     style={{
      width:"100%",
      display:"flex",
      justifyContent:"center",
    marginTop:"20px",
    flexDirection:"column"
    }}
    >
      <Input
      style={{
        margin:"10px",
        width:"280px",
      }}
        placeholder="Enter your Name"
        type="file"
        
        onChange={
          uploadImage
        }
      />
      <Input
      style={{
        margin:"10px",
        width:"280px",
      }}
        placeholder="Enter your Name"
        value={name}
        onChange={(e)=>{
          setName(e.target.value)
        }}
      />
      <Input
      style={{
        margin:"10px",
        width:"280px",
      }}
        placeholder="Enter brife description about yourself"
        value={bio}
        onChange={(e)=>{
          setBio(e.target.value)
        }}
      />
  
      <Button
      style={{
        width:"280px",
        margin:"10px 0",
        marginLeft:"10px",
        marginBottom:"30px"
      }}
      type="primary"
      danger
      onClick={()=>{
        finalUpdate()
        console.log("Hello")
        setToggle(false)
      }}
      > Update </Button>
    </div>
    
    
     </div>
  
   ) : null
}

 </div>
</div>
  )
}

export default Profile
