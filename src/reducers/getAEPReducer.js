import { SET_NEW_VIDEO } from '../actions/allActions'

const initialState = { s1: {}, s2: {}, s3: {}, s4: {}, s5: {} }

export default function getAEPReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_VIDEO:
        if (action.payload.season === "s1") {
          return {
            s1: action.payload.data,
            ...state
          }
        } else if (action.payload.season === "s2") {
          return {
            ...state,
            s2: action.payload.data
          }
        }
        return state;    
    default:
      return state
  }
}