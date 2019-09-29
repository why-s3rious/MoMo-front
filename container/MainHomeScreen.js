import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';
import { apiStore } from '../apis/index';
import { STOREIMAGES } from '../costants/StoreImages';

const datafake = [
    {
        "id": 1,
        "name": "Fake item 1",
        "address": "fake address 1, cái address này có chiều dài lên tới 2 dòng"
    },
    {
        "id": 2,
        "name": "Fake item 2",
        "address": "fake address 2"
    },
    {
        "id": 3,
        "name": "Fake item 3",
        "address": "fake address 3"
    },
    {
        "id": 4,
        "name": "Fake item 4",
        "address": "fake address 4"
    },
    {
        "id": 5,
        "name": "Fake item 5",
        "address": "fake address 5"
    },
    {
        "id": 6,
        "name": "Fake item 6",
        "address": "fake address 6"
    },
    {
        "id": 7,
        "name": "Fake item 7",
        "address": "fake address 7"
    },
    {
        "id": 8,
        "name": "Fake item 8",
        "address": "fake address 8"
    }
];
const mapStateToProps = function (state) {
    return {
        categoryListItem: state.category,
        location: state.location,
        infoUser: state.infoReducer
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
        // onGetCategoryListItem: async (searchText, sort, page, categoryId, location) => {
        //     const categoryListItem = await apiStore.getCategoryListItemApi(searchText, sort, page, categoryId, location);
        //     dispatch(action.onGetCategoryListItem(categoryListItem));
        // },
        //fake chờ api
        onGetCategoryListItem: async (cateID) => {
            let randImg = "";
            let newData = [];
            const categoryImages = STOREIMAGES.find(cate => cate.id === cateID);
            datafake.forEach( element  =>  {
                let item = element;
                randImg = categoryImages.imgUrl[Math.floor(Math.random() * categoryImages.imgUrl.length)];
                item = { ...item, image: randImg }
                newData.push(item);
            });
            dispatch(action.onGetCategoryListItem(newData));
        },
    }
}

const MainHomeContainer = connect(mapStateToProps, mapDispatchToProps)(MainHome);
export default MainHomeContainer;