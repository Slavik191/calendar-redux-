import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import './NewEventButton.sass';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});



const NewEventButton = props => {
  const { classes } = props;
  
  return (
    <div className = 'neweventbutton'>
      <Button className={classes.button} onClick = {props.onOpenModal}>Добавить</Button>
    </div>
      
  );
}

NewEventButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(
  state => ({}),
  dispatch => ({
    onOpenModal: (arrDayInfo) => {
      dispatch({ type: 'OPEN_MODAL', payload: true });
      dispatch({ type: 'DATE_INFO', payload: ['', '', ''] })
    }     
  })
)(NewEventButton));

