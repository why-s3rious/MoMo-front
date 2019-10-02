const infoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INFO':
            return action.info
        case 'GET_INFO_FB':
            return action.userInfo
        default:
            return state
    }
}
export default infoReducer;