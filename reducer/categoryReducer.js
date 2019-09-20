
const category = (state = [], action) => {
    switch (action.type) {
        case 'GET_CATEGORY_LIST_ITEM': {
            return action.categoryListItem
        }
        case 'GET_LIST_CATEGORY':{
            return action.listCategory
        }
        default:
            return state
    }
}

export default category;