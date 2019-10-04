
const Zones = (state = [], action) => {
    switch (action.type) {
        case 'GET_ZONES': {
            return action.zones
        }
        default:
            return state
    }
}

export default Zones;