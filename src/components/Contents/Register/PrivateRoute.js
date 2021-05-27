import React from 'react'
import { useContext } from 'react'
import {Redirect, Route} from "react-router-dom"
import { AuthContext } from '../../Redux/reducers/AuthState'

const PrivateRoute = ({component: ComponentRoute, ...rest}) => {
  const {currentUser} = useContext(AuthContext)
  return (
    <Route
    {...rest}
    render= {(RouteProps)=>{
      return(
          currentUser ? (
            <ComponentRoute {...RouteProps} />
          ):(
            <Redirect to="/register" />
          )
      )
    }}

    />
   
  )
}

export default PrivateRoute
