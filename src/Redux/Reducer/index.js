import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {productReducers} from './productsReducer'
import { cartReducer } from './cartReducer'
import { transactionReducer } from './transactionReducer'
import { passwordReducer } from './profileReducer'

export default combineReducers({
    auth:authReducer,
    cart:cartReducer,
    products:productReducers,
    transactions:transactionReducer,
    pass:passwordReducer
})