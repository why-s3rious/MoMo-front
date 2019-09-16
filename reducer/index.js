import { combineReducers } from 'redux';
import categoryListItem from './categoryReducer';
import account from './accountReducer';


const reducer =  combineReducers({
    categoryListItem, account
    // visibilityFilter,
})

export default reducer;