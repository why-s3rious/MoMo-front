import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';
import { apiStore } from '../apis/index';
import { STOREIMAGES } from '../costants/StoreImages';
import { TIMES, PRICES } from '../costants/TimesAndPrice';

const mapStateToProps = function (state) {
    return {
        categoryListItem: state.listItem,
        location: state.location,
        infoUser: state.infoReducer,
        suggestList: state.suggestList,
        statusPostNotInterested: state.statusPostNotInterested,
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onGetCategoryListItem: async (searchText, sort, page, categoryId, location, zone, area, filter) => {
            let randImg = "";
            let newData = [];
            const categoryImages = STOREIMAGES.find(cate => cate.id === categoryId);
            let categoryListItem = await apiStore.getCategoryListItemApi(searchText, sort, page, categoryId, location, zone, area, filter);
            if (typeof categoryListItem == 'number') {
                categoryListItem = [];
            }
            else {
                await categoryListItem.stores.forEach(element => {
                    let item = element;
                    randTime = TIMES[Math.floor(Math.random() * TIMES.length)];
                    randPrice = PRICES[Math.floor(Math.random() * PRICES.length)];
                    randImg = categoryImages.imgUrl[Math.floor(Math.random() * categoryImages.imgUrl.length)];
                    item = { ...item, image: randImg, time: randTime, price: randPrice }
                    newData.push(item);
                });
                categoryListItem.stores = newData;
            }
            dispatch(action.onGetCategoryListItem(categoryListItem));
        },
        onGetSuggest: async (searchText) => {
            const data = await apiStore.getSuggestListApi(searchText);
            dispatch(action.onGetSuggest(data))
        },
        onPostNotInterested: async (id) => {
            let status = await apiStore.postNotInterestedApi(id);
            dispatch(action.onPostNotInterested(status));
        }
    }
}

const MainHomeContainer = connect(mapStateToProps, mapDispatchToProps)(MainHome);
export default MainHomeContainer;