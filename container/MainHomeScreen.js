import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';

const mapStateToProps = function (state) {
    return { categoryListItem: state.categoryListItem }
}

// const mapDispatchToProps = function (dispatch) {
//     // return {
//     //     onGetAllTodo: async () => {
//     //         const list = await apiTodoList.getAllTodoApi();
//     //         dispatch(action.onGetAllTodo(list));
//     //     },
//     // }
//     return {
//         onGetCategoryListItem: () => {
//             dispatch(action.onGetCategoryListItem(categoryName));
//         }
//     }
// }

const MainHomeContainer = connect(mapStateToProps)(MainHome);
export default MainHomeContainer;