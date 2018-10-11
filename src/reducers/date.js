const initialState = {
    date: new Date(),
};

export default function date(state = initialState, action) {
    switch (action.type) {
        case 'NEW_MONTH':
            return { ...state, date: action.payload };
            break;
        default:
            break;
    }
    return state;
}