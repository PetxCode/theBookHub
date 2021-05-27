import {actionTypes} from "../constants/actionType"

const initState = {
  posts: [
    {id: 1, post:"Hello"}
  ]
}

export const addPostReducer = (state=initState, {type, payload}) =>{
  switch (type) {
    case actionTypes.ADD_POST:
      return {...state, posts: payload}
  
    default:
      return state
  }
}

export const selectPostReducer = (state=initState, {type, payload}) =>{
  switch (type) {
    case actionTypes.SELECT_POST:
      return {...state, ...payload}
  
    default:
      return state
  }
}