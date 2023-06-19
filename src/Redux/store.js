import { createStore, combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import wsReducer from './reducer'

const rootReducer = combineReducers({
    ws: wsReducer
})

const store = createStore (rootReducer, applyMiddleware(thunk));

export default store