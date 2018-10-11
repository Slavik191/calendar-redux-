const initialState = false;


export default function advancedMode(state = initialState, action) {
    switch (action.type) {
        case 'ADVANCED_MODE':
            return !state;
            break;
        default:
            break;
    }
    return state;
}