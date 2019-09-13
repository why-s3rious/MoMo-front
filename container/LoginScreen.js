import { connect } from 'react-redux';
import Login from '../screens/Login';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { account: state.account }   
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: async () => {
            const account = await accountStore.checkLoginApi();
            dispatch(action.onLogin(account));
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer;