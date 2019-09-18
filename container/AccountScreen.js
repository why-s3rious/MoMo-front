import { connect } from 'react-redux';
import Account from '../screens/Account';
import * as action from '../action/index';
import { accountStore } from '../apis/index';

const mapStateToProps = state => {
    return { info: state.infoReducer }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInfo: async (token) => {
            const info = await accountStore.infoApi(token);
            dispatch(action.onGetInfo(info))
        }
    }
}

const AccountContainer = connect(mapStateToProps,mapDispatchToProps)(Account);
export default AccountContainer;