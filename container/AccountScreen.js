import { connect } from 'react-redux';
import Account from '../screens/Account';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { userInfo: state.infoReducer }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInfo: async (token) => {
            const info = await accountStore.infoApi(token);
            dispatch(action.onGetInfo(info))
        },
        onGetInfoFb: async (token) => {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            dispatch(action.onGetInfoFb(userInfo))
        },
        onConnectFb: async (fb_id, token) => {
            let message = await accountStore.connectFbApi(fb_id, token)
            console.log("message connect: ", message)
            dispatch(action.onConnectFb(message));
        },
        onDisConnectFb: async (token) => {
            let message = await accountStore.disConnectFbApi(token)
            console.log("message connect: ", message)
            dispatch(action.onDisConnectFb(message));
        },
    }
}

const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(Account);
export default AccountContainer;