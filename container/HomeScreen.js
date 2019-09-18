import { connect } from 'react-redux';
import Home from '../screens/Home';
import * as action from '../action/index';
import {apiStore} from '../apis/index';

const mapDispatchToProps = function (dispatch) {
    return {
        onGetLocation: (location) => {
            dispatch(action.onGetLocation(location));
        },
    }
}

const HomeContainer = connect(null,mapDispatchToProps)(Home);
export default HomeContainer;