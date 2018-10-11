const initialState = {
    day: '',
    month: '',
    year: '',
    startHours: '',
    startMinutes: '',
    endHours: '',
    endMinutes: '',
    description: ''
};

export default function formNewEvent(state = initialState, action) {
    switch (action.type) {
        case 'NEW_VALUE':
            return { ...state, [action.payload.name]: action.payload.newValue };
            break;
        case 'DATE_INFO':
            return {
                    ...state,
                    day: action.payload[0],
                    month: action.payload[1],
                    year: action.payload[2]
                  };
            break;
        case 'CLEAR_FORM':
        return {...initialState};
        break;
        default:
            break;
    }
    return state;
}