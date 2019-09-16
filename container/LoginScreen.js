import { connect } from 'react-redux';
import Login from '../screens/Login';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { account: state.account }   
}
const mapDispatchToProps = dispatch => {
    return {
        onGetAllAccount: async () => {
            const account = await accountStore.getAllAccountApi();
            dispatch(action.onGetAllAccount(account));
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer;