import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormNewEvent from '../FormNewEvent/FormNewEvent.jsx';
import AnnualForm from '../AnnualForm/AnnualForm';
import { connect } from 'react-redux';




function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends Component {

    getNewEvent = () => {
            let info = this.props.formInfo, annual = this.props.annualForm;
            for (let key in info) {
                if (`${info[key]}`.trim() === '') {
                    alert('Заполните все поля');
                    return false;
                }
            }
            if (info.startHours * 60 + +info.startMinutes > info.endHours * 60 + +info.endMinutes) {
                alert('Некорректное время');
                return false;
            }
            if (new Date(`${info.year}/${info.month}/${info.day}`).toString() === 'Invalid Date') {
                alert('Некорректная дата');
                return false;
            }
            if (new Date() > new Date(info.year, info.month - 1, info.day, info.startHours, info.startMinutes)) {
                alert('Вы указали прошедшую дату');
                return false;
            }
            let intersection = false;
            let events;
            if (!annual) {
                events = this.props.events.events;
                if(events[`${info.year}`] !== undefined){
                    if(events[`${info.year}`][`${info.month}`] !== undefined){
                        if(events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                            if (events[`${info.year}`][`${info.month}`][`${info.day}`].length > 0) {
                                if(events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                                    events[`${info.year}`][`${info.month}`][`${info.day}`].forEach(event => {
                                        if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                            intersection = true
                                    })
                                }
                            }
                        }
                    }
                }
                // (((events[`${info.year}`] || {})
                // [`${info.month}`] || {})
                // [`${info.day}`] || [])
                

                //     .( || [])
                //         .(events[`${info.year}`][`${info.month}`][`${info.day}`] || [])
                //             .(events[`${info.year}`][`${info.month}`][`${info.day}`].length > 0) 
                //                 .(events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined)
                //                     .forEach(event => {
                //                         if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                //                             intersection = true
                //                     })
                    
                if (this.props.events.annualEvents[`${info.month}`] !== undefined) {
                    if(this.props.events.annualEvents[`${info.month}`][`${info.day}`] !== undefined){
                        this.props.events.annualEvents[`${info.month}`][`${info.day}`].forEach(event => {
                            if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                intersection = true
                        })
                    }
                }
    
            }
            else {
                events = this.props.events.annualEvents;            
                if(events[`${info.month}`] !== undefined){
                    if(events[`${info.month}`][`${info.day}`] !== undefined){
                        if (events[`${info.month}`][`${info.day}`].length > 0) {
                            events[`${info.month}`][`${info.day}`].forEach(event => {
                                if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                    intersection = true
                            })
                        }
                    }
                }
                if (this.props.events.events[`${info.year}`] !== undefined) {
                    if (this.props.events.events[`${info.year}`][`${info.month}`] !== undefined) {
                        if(this.props.events.events[`${info.year}`][`${info.month}`][`${info.day}`] !== undefined){
                            this.props.events.events[`${info.year}`][`${info.month}`][`${info.day}`].forEach(event => {
                                if (!(event.startHours * 60 + +event.startMinutes > info.endHours * 60 + +info.endMinutes || event.endHours * 60 + +event.endMinutes < info.startHours * 60 + +info.startMinutes))
                                    intersection = true
                            })
                        }
                    }
                }
            }
            if (intersection ? window.confirm('Данное время уже занято...Всё равно добавить?') : true) {
                if (!annual) {
                    if (events[`${info.year}`] === undefined)
                        events[`${info.year}`] = {};
                    if (events[`${info.year}`][`${info.month}`] === undefined)
                        events[`${info.year}`][`${info.month}`] = {};
                    if (events[`${info.year}`][`${info.month}`][`${info.day}`] === undefined)
                        events[`${info.year}`][`${info.month}`][`${info.day}`] = [];
                    events[`${info.year}`][`${info.month}`][`${info.day}`].push({
                        day: info.day,
                        description: info.description,
                        endHours: info.endHours,
                        endMinutes: info.endMinutes,
                        month: info.month,
                        startHours: info.startHours,
                        startMinutes: info.startMinutes,
                        year: info.year
                    })
                    this.props.onAddEvent(events);
                }
                else {
                    if (events[`${info.month}`] === undefined)
                        events[`${info.month}`] = {};
                    if (events[`${info.month}`][`${info.day}`] === undefined)
                        events[`${info.month}`][`${info.day}`] = [];
                    events[`${info.month}`][`${info.day}`].push({
                        day: info.day,
                        description: info.description,
                        endHours: info.endHours,
                        endMinutes: info.endMinutes,
                        month: info.month,
                        startHours: info.startHours,
                        startMinutes: info.startMinutes,
                        year: info.year
                    })
                    this.props.onAddAnnualEvent(events);                    
                }
            }
    
        }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.modal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"ДОБАВИТЬ СОБЫТИЕ"}
                        <AnnualForm />
                    </DialogTitle>
                    <DialogContent>
                        
                        <FormNewEvent />
                   
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onCloseModal} color="primary">
                            Отмена
            </Button>
                        <Button onClick={this.getNewEvent} color="primary">
                            Создать
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default connect(
    state => ({
        modal: state.modal.modal,
        formInfo: state.formNewEvent,
        annualForm: state.annualForm,
        events: state.events
      }),
      dispatch => ({
        onCloseModal: () => {
            dispatch({ type: 'OPEN_MODAL', payload: false });
            dispatch({ type: 'CLEAR_FORM'});
        },  
        onAddEvent: (events) => {
          dispatch({ type: 'ADD_EVENT', payload: events });
          dispatch({ type: 'OPEN_MODAL', payload: false });
          dispatch({ type: 'CLEAR_FORM'});
        },
        onAddAnnualEvent: (events) => {
            dispatch({ type: 'ADD_ANNUAL_EVENT', payload: events });
            dispatch({ type: 'OPEN_MODAL', payload: false });
            dispatch({ type: 'CLEAR_FORM'});
        }
      })
)(AlertDialogSlide);
