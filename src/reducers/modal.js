const initialState = {
    modal: false,
    openEventModal: false
};

export default function date(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, modal: action.payload };
            break;
        case 'OPEN_EVENT_MODAL':
            return { ...state, openEventModal: action.payload };
            break;
        default:
            break;
    }
    return state;
}