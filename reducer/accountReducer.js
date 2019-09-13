const account = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN': {
            return action.account
        }
        case 'REGISTER': {
            return [
                {
                    id: action.id,
                    name: action.name,
                    phoneNumber: action.phoneNumber,
                    passwork: action.passwork,
                    class: action.class
                }, ...state
            ]
        }
        default:
            return state
    }
}

export default account;