const initialState = new Date();

export default function date(state = initialState, action) {
    if (action.type === 'NEW_MONTH') {
        return new Date(action.payload);    
      }
      return state;
}