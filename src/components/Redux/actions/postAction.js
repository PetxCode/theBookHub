import {actionTypes} from "../constants/actionType"


export const addPostAction = (posts) => {
  return{
    type: actionTypes.ADD_POST,
    payload: posts
  }
} 

export const selectPostAction = (post) => {
  return{
    type: actionTypes.SELECT_POST,
    payload: post
  }
} 

export const removePostAction = () => {
  return{
    type: actionTypes.DELETE_POST,
   
  }
} 