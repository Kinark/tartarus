import { combineReducers } from 'redux'
import { FETCH_MY_RULESETS_START, FETCH_MY_RULESETS_SUCCESS, FETCH_MY_RULESETS_FAILURE } from '../actions/myRulesets'

function loading(state = false, action) {
   switch (action.type) {
      case FETCH_MY_RULESETS_START:
         return true
      case FETCH_MY_RULESETS_SUCCESS:
      case FETCH_MY_RULESETS_FAILURE:
         return false
      default:
         return state
   }
}

function error(state = false, action) {
   switch (action.type) {
      case FETCH_MY_RULESETS_FAILURE:
         return action.payload
      case FETCH_MY_RULESETS_SUCCESS:
         return false
      default:
         return state
   }
}

function content(state = [], action) {
   switch (action.type) {
      case FETCH_MY_RULESETS_SUCCESS:
         return action.payload
      default:
         return state
   }
}

function done(state = false, action) {
   switch (action.type) {
      case FETCH_MY_RULESETS_SUCCESS:
         return true
      default:
         return state
   }
}

export default combineReducers({
   loading,
   error,
   content,
   done
})
