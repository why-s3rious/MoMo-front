import { combineReducers } from 'redux';
import category from './categoryReducer';
import location from './locationReducer'
import loginReducer from './loginReducer';
import infoReducer from './infoReducer';



const reducer = combineReducers({
    category, loginReducer, infoReducer, location
    // visibilityFilter,
})

export default reducer;