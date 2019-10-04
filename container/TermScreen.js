import { connect } from "react-redux";
import Term from '../screens/Term';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { account: state.registerReducer }   
}
const mapDispatchToProps = dispatch => {
    return {
        onRegister: async data => {
            let message = await accountStore.registerApi(data)
            dispatch(action.onRegister(message))
        }
    }   
}
const TermContainer = connect(mapStateToProps,mapDispatchToProps)(Term);
export default TermContainer;