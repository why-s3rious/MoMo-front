import { combineReducers } from 'redux';
import category from './categoryReducer';
import location from './locationReducer'
import loginReducer from './loginReducer';
import infoReducer from './infoReducer';
import suggestList from './suggestReducer'
import registerReducer from './registerReducer'
import logoReducer from './logoReducer'


const reducer = combineReducers({
    category, loginReducer, infoReducer, location, registerReducer, logoReducer, suggestList
    // visibilityFilter,
})

export default reducer;