const initialState = false;

export default function annualForm(state = initialState, action) {
    switch (action.type) {
        case 'ANNUAL':
            return !state;
            break;
        default:
            break;
    }
    return state;
}