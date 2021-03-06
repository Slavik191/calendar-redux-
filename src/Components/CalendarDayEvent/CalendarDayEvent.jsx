import React from 'react';
import { connect } from 'react-redux';
import './CalendarDayEvent.sass';



const CalendarDayEvent = (props, contex) => {

    let giveInfoEvent = (event) => {
        event.stopPropagation();
        props.onOpenEventModal(props.event);
    }

    return (
        <div className = {props.advancedMode ? new Date() > new Date(props.event.year, props.event.month - 1, props.event.day, props.event.startHours, props.event.startMinutes) ? 'advancedmodeevent crimson' : 'advancedmodeevent' : 'advancedmodeevent event'} onClick = {giveInfoEvent}>{props.event.description.length > 10 ? `${props.event.description.slice(0, 8)}..` : props.event.description}</div>
    )
}


export default connect(
    state => ({
        advancedMode: state.advancedMode
      }),
      dispatch => ({
        onOpenEventModal: (event) => {
          dispatch({ type: 'OPEN_EVENT_MODAL', payload: true });
          dispatch({ type: 'EVENT_MODAL_INFO', payload: event });
        },
              
      })
)(CalendarDayEvent);