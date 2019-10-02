import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';
import { apiStore } from '../apis/index';
import { STOREIMAGES } from '../costants/StoreImages';


const mapStateToProps = function (state) {
    return {
        categoryListItem: state.category,
        location: state.location,
        infoUser: state.infoReducer,
        suggestList: state.suggestList
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onGetCategoryListItem: async (searchText, sort, page, categoryId, location) => {
            let randImg = "";
            let newData = [];
            const categoryImages = STOREIMAGES.find(cate => cate.id === categoryId);
            const categoryListItem = await apiStore.getCategoryListItemApi(searchText, sort, page, categoryId, location);
            await categoryListItem.stores.forEach(element => {
                let item = element;
                randImg = categoryImages.imgUrl[Math.floor(Math.random() * categoryImages.imgUrl.length)];
                item = { ...item, image: randImg }
                newData.push(item);
            });
            categoryListItem.stores = newData;
            dispatch(action.onGetCategoryListItem(categoryListItem));
        },
        onGetSuggest: async (searchText) => {
            const data = await apiStore.getSuggestListApi(searchText);
            dispatch(action.onGetSuggest(data))
        }
    }
}

const MainHomeContainer = connect(mapStateToProps, mapDispatchToProps)(MainHome);
export default MainHomeContainer;