import { connect } from "react-redux";
import Modal from '../screens/Modal';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { Zones: state.Zones }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         onRegister: async data => {
//             let message = await accountStore.registerApi(data)
//             dispatch(action.onRegister(message))
//         }
//     }
// }
const ModalContainer = connect(mapStateToProps)(Modal);
export default ModalContainer;