import { combineReducers } from 'redux';
import date from './date';
import modal from './modal';
import formNewEvent from './formNewEvent';
import advancedMode from './advancedMode';
import events from './events';
import annualForm from './annualForm';

export default combineReducers({
    date,
    modal,
    formNewEvent,
    advancedMode,
    events,
    annualForm
})