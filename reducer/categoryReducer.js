
const categoryListItem = (state = null, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_LIST_ITEM': {
            return action.categoryListItem
        }
        default:
            return state
    }
}

export default categoryListItem;