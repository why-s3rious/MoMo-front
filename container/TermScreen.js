import { connect } from "react-redux";
import Term from '../screens/Term';
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
        },
        onRegister: async account => {
            accountStore.registerApi(account)
            dispatch(action.onRegister(account))
        }
    }   
}
const TermContainer = connect(mapStateToProps,mapDispatchToProps)(Term);
export default TermContainer;