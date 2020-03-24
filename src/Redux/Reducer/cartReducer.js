const INITIAL_STATE = {
    cartList:[]
}

export const cartReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOAD_CART':
            return{
                ...state,
                cartList:action.payload
            }
            default:
                return state
    }
}