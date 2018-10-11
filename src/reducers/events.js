const initialState = {
    events: {},
    annualEvents: {},
    eventModalInfo: null
};

export default function events(state = initialState, action) {
    switch (action.type) {
        case 'ADD_EVENT':
            return {...state, events: action.payload};
            break;
        case 'ADD_ANNUAL_EVENT':
            return {...state, annualEvents: action.payload};
            break;
        case 'EVENT_MODAL_INFO':
            return {...state, eventModalInfo: action.payload};
            break;
        default:
            break;
    }
    return state;
}