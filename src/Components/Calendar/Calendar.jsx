import React, { Component } from 'react';
import left from './chevron-left.png';
import right from './chevron-right.png';
import CalendarDay from '../CalendarDay/CalendarDay';
import ChangeMode from '../ChangeMode/ChangeMode';
import AlertDialogSlide from '../AlertDialogSlide/AlertDialogSlide';
import NewEventButton from '../NewEventButton/NewEventButton';
import EventModal from '../EventModal/EventModal';
import { connect } from 'react-redux';
import './Calendar.sass';

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

Date.prototype.startDay = function () {
    let day = new Date(this.getFullYear(), this.getMonth(), 1).getDay()
    return day === 0 ? 7 : day;
};


class Calendar extends Component {
    
    

    nextmounth = () => {
        let date = new Date(this.props.date.date);
        date.setMonth(date.getMonth() + 1);
        this.props.onNewMonth(date);
    }

    previousmounth = () => {
        let date = new Date(this.props.date.date);
        date.setMonth(date.getMonth() - 1);
        this.props.onNewMonth(date);
    }


    items = () => {
        let items = [];
        let eventsMonth;
        let annualEventsMonth;
        let startDay = this.props.date.date.startDay();
        let daysInMonth = this.props.date.date.daysInMonth();
        if (this.props.events.events[`${this.props.date.date.getYear() + 1900}`] !== undefined) {
            eventsMonth = this.props.events.events[`${this.props.date.date.getYear() + 1900}`][`${this.props.date.date.getMonth() + 1}`]
        }
        annualEventsMonth = this.props.events.annualEvents[`${this.props.date.date.getMonth() + 1}`]
        for (let i = 1; i <= daysInMonth + startDay - 1; i++) {
            if (i >= startDay) {
                let eventsDay;
                if (eventsMonth !== undefined)
                    eventsDay = eventsMonth[`${i - (startDay - 1)}`];
                if (annualEventsMonth !== undefined) {
                    if (annualEventsMonth[`${i - (startDay - 1)}`] !== undefined) {
                        if (eventsDay === undefined)
                            eventsDay = [];
                        if (annualEventsMonth[`${i - (startDay - 1)}`][0].year <= this.props.date.date.getYear() + 1900)
                            eventsDay.push(...annualEventsMonth[`${i - (startDay - 1)}`])
                    }
                }
                
                
                if (eventsDay !== undefined) {
                    for (let i = 0; i < eventsDay.length - 1; i++) {
                        if (eventsDay[i].startHours * 60 + +eventsDay[i].startMinutes > eventsDay[i + 1].startHours * 60 + +eventsDay[i + 1].startMinutes) {
                            let vrem = eventsDay[i];
                            eventsDay[i] = eventsDay[i + 1];
                            eventsDay[i + 1] = vrem;
                        }
                    }
                    eventsDay = [ ...new Set(eventsDay)]
                }
                
                
                items.push(<CalendarDay
                            day={i - (startDay - 1)}
                            month={this.props.date.date.getMonth() + 1}
                            year={this.props.date.date.getYear() + 1900}
                            key={i - (startDay - 1)}                
                            eventsDay={eventsDay}
                        />)
            }
            else {
                items.push(<CalendarDay key={i + 50} />)
            }
        }
        let finishDays;
        items.length % 7 !== 0 ? finishDays = items.length % 7 : finishDays = 0;
        if (finishDays !== 0) {
            for (let i = 1; i <= 7 - finishDays; i++) {
                items.push(<CalendarDay key={i + 100} />)
            }
        }
        return items;
    }

    render() {
        return (
            <React.Fragment>
                <EventModal />
                <AlertDialogSlide />
                <div className='calendarcontainer'>
                    <div className='calendarnavigation'>
                        <NewEventButton openModal={this.openModal} />
                        <div className='monthandyear'>
                            <img src={left} onClick={this.previousmounth} />
                            <div className='monthandyeartext'>
                                {this.props.date.date.toLocaleString('ru', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                            <img src={right} onClick={this.nextmounth} />
                        </div>
                        <ChangeMode />
                    </div>
                    <div className='calendarbody'>
                        <div className='week'>
                            <div className='nameday'>Понедельник</div>
                            <div className='nameday'>Вторник</div>
                            <div className='nameday'>Среда</div>
                            <div className='nameday'>Четверг</div>
                            <div className='nameday'>Пятница</div>
                            <div className='nameday'>Суббота</div>
                            <div className='nameday'>Воскресенье</div>
                        </div>
                        <div className='calendardays'>
                            {this.items()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect(
    state => ({
        date: state.date,
        events: state.events
      }),
      dispatch => ({
        onNewMonth: (newDate) => {
          dispatch({ type: 'NEW_MONTH', payload: newDate })
        }      
      })
)(Calendar);
