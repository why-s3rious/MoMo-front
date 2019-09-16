import { connect } from "react-redux";
import Register from '../screens/Register';
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

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)
export default RegisterContainer;