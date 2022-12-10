import { GET_USER_BY_ID } from '../actions/allActions'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_ID:
      return action.payload
    default:
      return state
  }
}