import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import './AnnualForm.sass';

class AnnualForm extends Component {
    render() {
        return (
            <div className = 'annualform'>
                <FormControlLabel
                    labelPlacement="start"
                    label="Повторять ежегодно"
                    control={
                        <Checkbox
                            checked={this.props.annualForm}
                            onChange={this.props.onChengeAnnual}
                            value="checked"
                        />
                    }
                />
            </div>
        )
    }

}

export default connect(
    state => ({
        annualForm: state.annualForm
      }),
      dispatch => ({
        onChengeAnnual: () => {
          dispatch({ type: 'ANNUAL'})
        },
              
      })
)(AnnualForm);