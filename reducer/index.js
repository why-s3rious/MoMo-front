import { combineReducers } from 'redux';
import categoryListItem from './categoryReducer';
import loginReducer from './loginReducer';
import infoReducer from './infoReducer';


const appReducer = combineReducers({
    categoryListItem, loginReducer, infoReducer

    // visibilityFilter,
})
const reducer = (state, action) => {
    return appReducer(state, action);
}

export default reducer;