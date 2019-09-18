import { combineReducers } from 'redux';
import categoryListItem from './categoryReducer';
import account from './accountReducer';
import location from './locationReducer'


const reducer =  combineReducers({
    categoryListItem, account ,location
    // visibilityFilter,
})

export default reducer;