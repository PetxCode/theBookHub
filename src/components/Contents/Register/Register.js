import { Button, Input } from 'antd'
import React, {useState} from 'react'
import { app } from '../../../base'
import firebase from "firebase"
import { useHistory } from 'react-router'

const Register = () => {
  const hist = useHistory()
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [toggle,setTogle] = useState(false)
  const [avatar, setAvatar] = useState("")

  const handleToggle = () => {
    setTogle(!toggle)
  }


  const SignUp = async() => {
    const signUp = await app.auth().createUserWithEmailAndPassword(email, password)

    await app.firestore().collection("users").doc(signUp.user.uid).set({
      name,
      email,
      password,
      first: name.charAt(0),
      avatar,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: signUp.user.uid
    })

    setName("")
    setEmail("")
    setPassword("")


    hist.push('/')
  }

  const SignIn = async () => {
    await app.auth().signInWithEmailAndPassword(email, password)
    hist.push('/')
  }

  const pushUp = async() => {
    await app.firestore().collection("game").doc().set({
      name
    })
    setName("")
  }


  return (
   
   <div
   style={{
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      marginBottom:"20px",
      marginTop:"100px",
     
    }}
   >
   {
     toggle ? (
      <div
      style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
       
        width:"300px"
      }}
      >
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <br/>
        <Input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <br/>
        <Input
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
        type="primary"
        danger
        style={{
          marginTop:"10px"
        }}
        onClick={()=>{
          SignUp()
          pushUp()

        }}
        >Sign Up</Button>
        <div
        style={{
          display:"flex"
        }}
        >
          <div>Aleady have an Account</div>
          <div
           style={{
            display:"flex",
            color:"red",
            marginLeft:"5px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
          onClick={()=>{
            console.log("signed in")
            handleToggle()
          }}
          
          >Sign In here</div>
        </div>
      </div>
    
     ):(
      <div
      style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
       
        width:"300px"
      }}
      >
        
        <Input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <br/>
        <Input
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
        type="primary"
       
        style={{
          marginBottom:"10px",
          marginTop:"10px"
        }}
        onClick={SignIn}
        >Sign In</Button>
        <div
        style={{
          display:"flex"
        }}
        >
          <div>Aleady have an Account</div>
          <div
           style={{
            display:"flex",
            color:"blue",
            marginLeft:"5px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
          onClick={()=>{
            console.log("signed in")
            handleToggle()
          }}
          
          >Sign In here</div>
        </div>
      </div>
    
     )
   }
   </div>
  )
}

export default Register
