import { GET_ALL } from '../actions/allActions'

const initialState = {}

export default function getAllsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return action.payload
    default:
      return state
  }
}