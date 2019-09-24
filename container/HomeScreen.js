import { connect } from 'react-redux';
import Home from '../screens/Home';
import * as action from '../action/index';
import { apiStore } from '../apis/index';
import { accountStore } from '../apis/index';

const mapStateToProps = function (state) {
    return {
        listCategory: state.category,
    }
}


const mapDispatchToProps = function (dispatch) {
    return {
        onGetLocation: (location) => {
            dispatch(action.onGetLocation(location));
        },
        onGetListCategory: async () => {
            const listCategory = await apiStore.getCategoryListApi();
            dispatch(action.onGetListCategory(listCategory));
        },
        onGetInfo: async (token) => {
            const info = await accountStore.infoApi(token);
            dispatch(action.onGetInfo(info))
        }

    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;