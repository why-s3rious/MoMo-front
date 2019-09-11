import { combineReducers } from 'redux';
import categoryListItem from './categoryReducer';


const reducer =  combineReducers({
    categoryListItem,
    // visibilityFilter,
})

export default reducer;