import { combineReducers } from 'redux';
import category from './categoryReducer';
import location from './locationReducer'
import loginReducer from './loginReducer';
import infoReducer from './infoReducer';
import suggestList from './suggestReducer'


const reducer = combineReducers({
    category, loginReducer, infoReducer, location, suggestList
    // visibilityFilter,
})

export default reducer;