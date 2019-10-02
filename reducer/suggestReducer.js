
const suggestList = (state = [], action) => {
    switch (action.type) {
        case 'GET_SUGGEST': {
            if (action.suggestList == null) {
                return state;
            }
            else {
                return action.suggestList.suggestions;
            }
        }
        default:
            return state;
    }
}

export default suggestList;