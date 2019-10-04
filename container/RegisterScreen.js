import { connect } from "react-redux";
import Register from '../screens/Register';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { messageRegister: state.registerReducer }   
}
const mapDispatchToProps = dispatch => {
    return {
        onRegister: async (data) => {
            const message = await accountStore.registerApi(data);
            dispatch(action.onRegister(message));
        }
    }
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)
export default RegisterContainer;