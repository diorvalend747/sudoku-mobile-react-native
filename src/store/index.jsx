import { createStore, combineReducers,  applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { sudokuReducers } from './sudokuReducer'

const reducers = combineReducers({ sudokuReducers })

const middlewares = applyMiddleware(ReduxThunk)

const store = createStore(reducers, middlewares)

export default store;