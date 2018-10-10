const initialState = {
    date: new Date(),
    dateInfo: null
};

export default function date(state = initialState, action) {
    switch (action.type) {
        case 'NEW_MONTH':
            return { ...state, date: action.payload };
            break;
        case 'DATE_INFO':
            return { ...state, dateInfo: action.payload };
            break;
        default:
            break;
    }
    return state;
}