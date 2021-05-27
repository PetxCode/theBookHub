import { Button, Input } from 'antd'
import React,{useState, useEffect} from 'react'
import {app} from "../../../base"
import firebase from "firebase"
import { useContext } from 'react'
import { AuthContext } from '../../Redux/reducers/AuthState'
import { useHistory } from 'react-router'

const Post = () => {
  const hist = useHistory()
  const {currentUser} = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [brife, setBrife] = useState('')
  const [detail, setDetail] = useState('')
  const [amountRaise, setAmountRaise] = useState('')
  const [amountLeft, setAmountLeft] = useState('')
  const [amount, setAmount] = useState('')
  const [coverImage, setCoverImage] = useState(null)


  const uploadImage = async(e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setCoverImage( await fileRef.getDownloadURL())
  }

  const makePost = async() => {
    
  const newUser = await app.auth().currentUser
    if(newUser){
      await app.firestore().collection("post").doc().set({
        createdBy: newUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        amount,
        amountLeft,
        amountRaise, 
        detail, 
        brife,
        coverImage,
        title
        
      })
      hist.push('/')
    }
  }


  return (
    <div
    style={{
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      marginTop:"20px"
    }}
    >
      <div
      style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        width:"300px",
        marginTop:"10px"
      }}
      >
      <div>Post Screen</div>
      <div>
        <Input
        style={{
          margin:"10px 0",
        }}
        type="file"

          onChange={uploadImage}
        />
        <Input
        style={{
          margin:"10px 0",
        }}
          placeholder="title"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
        />
        <Input
        style={{
          margin:"10px 0",
        }}
          placeholder="Amount"
          value={amount}
          onChange={(e)=>{
            setAmount(e.target.value)
          }}
        />
        <Input
        style={{
          margin:"10px 0",
        }}
          placeholder="Enter in Brife why you need help"
          value={brife}
          onChange={(e)=>{
            setBrife(e.target.value)
          }}
        />
        <Input
        style={{
          margin:"10px 0",
        }}
          placeholder="Tell us in detail how should people help"
          value={detail}
          onChange={(e)=>{
            setDetail(e.target.value)
          }}
        />

<Button
style={{
  width:"100%",
  height:"50px"
}}
type="primary"
danger
onClick={makePost}
>POST REQUEST</Button>

      </div>
      </div>
    </div>
  )
}

export default Post
