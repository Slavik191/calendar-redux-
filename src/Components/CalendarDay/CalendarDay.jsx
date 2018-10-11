import React, { Component } from 'react';
import CalendarDayEvent from '../CalendarDayEvent/CalendarDayEvent';
import './CalendarDay.sass';
import { connect } from 'react-redux';


class CalendarDay extends Component{

    shouldComponentUpdate(nextProps){
        if(this.props === nextProps)
            return false;
        return true;
    }


    openModalInfo = () => {
        if(this.props.day !== undefined){
            this.props.onOpenModal([this.props.day, this.props.month, this.props.year])
        }
    }

    render(){
        let eventsDay;
        if(this.props.eventsDay !== undefined){
            eventsDay = this.props.eventsDay.map((event, index) => {
                return <CalendarDayEvent event = {event} key = {index}/>  
            })
        }
        return(
                <div className = 'calendarday' onClick = {this.openModalInfo}>
                    {this.props.day !== undefined && <div className = {this.props.advancedMode ?  'numbersadvancedMode' : this.props.eventsDay !== undefined ?  'numbers red' :  'numbers' }>{this.props.day}</div>} 
                    <div className = {this.props.advancedMode ? ' eventsday eventsdayadvancedMode'  : 'eventsday' }>{eventsDay}</div>
                </div>
        )
    }
}

export default connect(
    state => ({
        modal: state.modal.modal,
        advancedMode: state.advancedMode
      }),
      dispatch => ({
        onOpenModal: (arrDayInfo) => {
          dispatch({ type: 'OPEN_MODAL', payload: true });
          dispatch({ type: 'DATE_INFO', payload: arrDayInfo })
        }     
      })
)(CalendarDay);

