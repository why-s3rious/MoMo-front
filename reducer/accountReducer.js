const account = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_ACCOUNT': {
            return action.account
        }
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

export default account;