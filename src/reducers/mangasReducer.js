import { GET_MANGAS } from '../actions/allActions'

const initialState = {}

export default function mangasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANGAS:
      return action.payload
    default:
      return state
  }
}