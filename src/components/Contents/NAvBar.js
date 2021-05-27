
import { Button } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { app } from '../../base'
import { AuthContext } from '../Redux/reducers/AuthState'

const NavBar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div>
      <Header
      style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
      }}
      >

      {
        currentUser ? (
            
       <Link
       to="/profile"
       >
       <div
       style={{
         color: "white"
       }}
       
       >Profile</div>
       </Link>
      
        ): null
      }
        
       <Link
       to="/"
       >
       <div
       style={{
         color: "white"
       }}
       
       >Home</div>
       </Link>
      


       <Link
        to="/post"
       >
       <div
       style={{
         color: "white"
       }}
      
       >Make Post</div>
       </Link>
      
       {
         currentUser ? (

          <Link
          to="/post"
         >
         <Button
         type="primary"
         danger
         style={{
           color: "white"
         }}
        onClick={()=>{
          app.auth().signOut()
        }}
         >LogOut</Button>
         </Link>
         ):(

          <Link
          to="/register"
         >
         <Button
          type="primary"
         style={{
           color: "white"
         }}
        
         >Sign In</Button>
         </Link>
         )
       }


      
       
      </Header>
    </div>
  )
}

export default NavBar
