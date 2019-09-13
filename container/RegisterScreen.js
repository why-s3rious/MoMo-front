import { connect } from "react-redux";
import Term from '../screens/Term';
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
        },
        onRegister: async account => {
            accountStore.registerApi(account)
            dispatch(action.onRegister(account))
        }
    }
}
const TermContainer = connect(mapStateToProps,mapDispatchToProps)(Term);
export default TermContainer;