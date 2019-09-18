const infoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INFO':
            return action.info

        default:
            return state
    }
}
export default infoReducer;