const registerReducer = (state = [], action) => {
    switch (action.type) {
        case 'REGISTER': {
            return action.message
        }
        default:
            return state
    }
}

export default registerReducer;