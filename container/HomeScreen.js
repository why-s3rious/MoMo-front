import { connect } from 'react-redux';
import Home from '../screens/Home';
import * as action from '../action/index';
import {apiStore} from '../apis/index';

// const mapDispatchToProps = function (dispatch) {
//     return {
//         onGetAllTodo: async () => {
//             const list = await apiTodoList.getAllTodoApi();
//             dispatch(action.onGetAllTodo(list));
//         },
//     }
//     return {
//         onGetCategoryListItem: async categoryName => {
//             const categoryListItem = await apiStore.getCategoryListItemApi(categoryName);
//             dispatch(action.onGetCategoryListItem(categoryListItem))
//         }

//     }
// }

const HomeContainer = connect(null)(Home);
export default HomeContainer;