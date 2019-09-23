import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';
import { apiStore } from '../apis/index';

const mapStateToProps = function (state) {
    return {
        categoryListItem: state.category,
        location : state.location,
        infoUser : state.infoReducer
    }
}

const mapDispatchToProps = function (dispatch) {
    // return {
    //     onGetAllTodo: async () => {
    //         const list = await apiTodoList.getAllTodoApi();
    //         dispatch(action.onGetAllTodo(list));
    //     },
    // }
    return {
        onGetCategoryListItem: async (searchText, sort, page, categoryId, location) => {
            const categoryListItem = await apiStore.getCategoryListItemApi(searchText, sort, page, categoryId, location);
            dispatch(action.onGetCategoryListItem(categoryListItem));
        }
        

    }
}

const MainHomeContainer = connect(mapStateToProps, mapDispatchToProps)(MainHome);
export default MainHomeContainer;