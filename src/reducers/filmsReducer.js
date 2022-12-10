import { GET_FILMS } from '../actions/allActions'

const initialState = {}

export default function filmsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILMS:
      return action.payload
    default:
      return state
  }
}