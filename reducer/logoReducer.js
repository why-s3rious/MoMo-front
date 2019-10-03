const logoReducer = (state = [], action) => {
    switch (action.type) {
        case 'CONNECT_FB':
            return action.message
        case 'LOGIN_FB': // return true false, hoac return token
            return action.token
        default:
            return state
    }
}

export default logoReducer;
