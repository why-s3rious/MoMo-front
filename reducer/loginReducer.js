const loginReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN': // return true false, hoac return token
            return action.token
        default:
            return state
    }
}

export default loginReducer;
