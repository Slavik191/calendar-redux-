import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import './FormNewEvent.sass';

class FormNewEvent extends Component{
    handleChange = name => event => {
        this.props.onNewValue(name, event.target.value)
    };

    handleChangeTime = name => event => {
        let change = false;
        if(name.indexOf('Hours') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 24)
            change = true;
        }
        if(name.indexOf('Minutes') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 60)
            change = true;
        }
        if(change){
            this.props.onNewValue(name, event.target.value);
        }
    };


    handleChangeDate = name => event => {
        let change = false;
        if(name.indexOf('day') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 32)
            change = true;
        }
        if(name.indexOf('month') !== -1){
            if(event.target.value.length < 3 && +event.target.value < 13)
            change = true;
        }
        if(name.indexOf('year') !== -1){
            if(event.target.value.length < 5)
            change = true;
        }
        if(change){
            this.props.onNewValue(name, event.target.value)
        }
    };

    render(){
        return(
            <React.Fragment>
                <div className = 'form'>
                <div className = 'formdate'>
                    <TextField
                        id="outlined-name"
                        label="Число"
                        value={this.props.formInfo.day}
                        onChange={this.handleChangeDate('day')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="месяц"
                        value={this.props.formInfo.month}
                        onChange={this.handleChangeDate('month')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Год"
                        value={this.props.formInfo.year}
                        onChange={this.handleChangeDate('year')}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div className = 'formtime'>
                    <div>
                        <span>С</span>
                        <TextField
                            id="outlined-name"
                            label="Часы"
                            value={this.props.formInfo.startHours}
                            onChange={this.handleChangeTime('startHours')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="минуты"
                            value={this.props.formInfo.startMinutes}
                            onChange={this.handleChangeTime('startMinutes')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <span>ДО</span>
                        <TextField
                            id="outlined-name"
                            label="Часы"
                            value={this.props.formInfo.endHours}
                            onChange={this.handleChangeTime('endHours')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="минуты"
                            value={this.props.formInfo.endMinutes}
                            onChange={this.handleChangeTime('endMinutes')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Описание"
                    multiline
                    rows = '4'
                    rowsMax="4"
                    value={this.props.formInfo.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    variant="outlined"
                />
                </div>

            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        formInfo: state.formNewEvent
      }),
      dispatch => ({
          onNewValue: (name, newValue) => {
              dispatch({type: 'NEW_VALUE', payload: {name: name, newValue: newValue}})
          }
      })
)(FormNewEvent);