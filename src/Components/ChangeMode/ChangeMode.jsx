import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import './ChangeMode.sass';

class ChangeMode extends Component {
    
    render() {
        return (
            <div className = 'switch'>
                <Switch
                    checked={this.props.advancedMode}
                    onChange={this.props.onChengeMode}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        advancedMode: state.advancedMode
      }),
      dispatch => ({
        onChengeMode: () => {
          dispatch({ type: 'ADVANCED_MODE'})
        },
              
      })
)(ChangeMode);