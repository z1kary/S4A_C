import { ADD_EPISODE, DELETE_EPISODE, GET_FILM, GET_MANGA, NEW_SEASON, SET_MANGA_TITLE, UPDATE_MANGA_EP } from '../actions/allActions'

const initialState = {}

export default function getOneReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANGA:
      return action.payload
    case GET_FILM:
      return action.payload
    case SET_MANGA_TITLE:
      return {
        ...state,
        title: action.payload.title
      }
    case ADD_EPISODE:
      return action.payload
    case UPDATE_MANGA_EP:
      return action.payload
    case NEW_SEASON:
      return {
        ...state,
        seasons: action.payload
      }
    case DELETE_EPISODE:
      if (action.payload.season === "s1") {
        return state.seasonsData.s1.map((item) => {
          if (item.epNum === action.payload.epNum) {
            return {
              title: ""
            }
          } else return item;
        })
      } else if (action.payload.season === "s2") {
        return state.seasonsData.s2.map((item) => {
          if (item.epNum === action.payload.epNum) {
            return {
              title: ""
            }
          } else return item;
        })
      } else if (action.payload.season === "s3") {
        return state.seasonsData.s3.map((item) => {
          if (item.epNum === action.payload.epNum) {
            return {
              title: ""
            }
          } else return item;
        })
      } else if (action.payload.season === "s4") {
        return state.seasonsData.s4.map((item) => {
          if (item.epNum === action.payload.epNum) {
            return {
              title: ""
            }
          } else return item;
        })
      } else if (action.payload.season === "s5") {
        return state.seasonsData.s5.map((item) => {
          if (item.epNum === action.payload.epNum) {
            return {
              title: ""
            }
          } else return item;
        })
      }
      break;
    default:
      return state
  }
}