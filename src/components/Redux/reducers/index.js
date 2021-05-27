import {combineReducers} from "redux"
import {addPostReducer, selectPostReducer} from "./postReducer"



export const reducer = combineReducers({
  all: addPostReducer,
  selected: selectPostReducer
})