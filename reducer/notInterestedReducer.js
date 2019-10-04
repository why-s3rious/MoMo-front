
const statusPostNotInterested = (state = 'false', action) => {
    switch (action.type) {
        case 'POST_NOT_INTERESTED': {
            return action.status
        }
        default:
            return state;
    }
}

export default statusPostNotInterested;