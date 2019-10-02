import { connect } from 'react-redux';
import Logo from '../screens/Logo';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

// goi cai state login o day. 
const mapStateToProps = state => {
    return { successLogin: state.logoReducer }
}


const mapDispatchToProps = dispatch => {
    return {
        onConnectFb: async (fb_id) => {
            let message = await accountStore.connectFbApi(fb_id)
            console.log("message connect: ",message)
            dispatch(action.onConnectFb(message));
        },
        onLoginFb: async (data) => {
            let token = await accountStore.loginFbApi(data)
            console.log("token",token)
            dispatch(action.onLoginFb(token));
        }
    }
}

const LogoContainer = connect(mapStateToProps, mapDispatchToProps)(Logo) // truyen vao
export default LogoContainer;