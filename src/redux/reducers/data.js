import { combineReducers } from 'redux'
import { SET_FRIENDS } from '../actions/data'

function friends(state = [], action) {
   switch (action.type) {
      case SET_FRIENDS:
         return action.friends
      default:
         return state
   }
}

const data = combineReducers({
   friends
})

export default data
