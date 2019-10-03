import { connect } from 'react-redux';
import Login from '../screens/Login';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

// goi cai state login o day. 
const mapStateToProps = state => {
    return { successLogin: state.loginReducer }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogin: async (data) => {
            let token = await accountStore.loginApi(data)
            dispatch(action.onLogin(token));
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer;