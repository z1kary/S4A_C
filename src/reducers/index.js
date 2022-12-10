import { combineReducers } from 'redux'
import mangasReducer from './mangasReducer'
import getAllsReducer from './getAllsReducer'
import getOneReducer from './getOneReducer'
import getAEPReducer from './getAEPReducer'
import userReducer from './userReducer'
import filmsReducer from './filmsReducer'

export default combineReducers({
  mangasReducer,
  getAllsReducer,
  getOneReducer,
  getAEPReducer,
  userReducer,
  filmsReducer
})