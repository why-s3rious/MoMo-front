const infoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INFO':
            return action.info
        case 'GET_INFO_FB':
            return action.userInfo
        case 'CONNECT_FB':
            return action.message
        case 'DISCONNECT_FB':
            return action.message
        default:
            return state
    }
}
export default infoReducer;