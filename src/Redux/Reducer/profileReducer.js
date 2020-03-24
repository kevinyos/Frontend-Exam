const INITIAL_STATE={
    password:''

}

export const passwordReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case 'CHANGEPASSWORD':
            return {
                password:action.payload.password
            };
        default:
            return state;
    }
}