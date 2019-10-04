import { connect } from 'react-redux';
import Home from '../screens/Home';
import * as action from '../action/index';
import { apiStore } from '../apis/index';
import { accountStore } from '../apis/index';

const mapStateToProps = function (state) {
    return {
        listCategory: state.category,
        userInfo: state.infoReducer
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
        },
        onGetInfoFb: async (token) => {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            console.log("dispatch");
            console.log(userInfo);
            dispatch(action.onGetInfoFb(userInfo))
        },
        onGetZones: async () => {
            let zones = await apiStore.getZonesApi();
            if (typeof zones == "number") {
                zones = [];
            }
            dispatch(action.onGetZones(zones))
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;