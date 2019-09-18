const registerReducer = (state = [], action) => {
    switch (action.type) {
        case 'REGISTER': {
            return [
                {
                    id: action.id,
                    username: action.username,
                    password: action.password,
                    jwt: action.jwt
                }, ...state
            ]
        }
        default:
            return state
    }
}

export default registerReducer;