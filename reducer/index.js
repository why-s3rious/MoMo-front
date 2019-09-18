import { combineReducers } from 'redux';
import categoryListItem from './categoryReducer';
import location from './locationReducer'
import loginReducer from './loginReducer';
import infoReducer from './infoReducer';



const reducer = combineReducers({
    categoryListItem, loginReducer, infoReducer, location
    // visibilityFilter,
})

export default reducer;