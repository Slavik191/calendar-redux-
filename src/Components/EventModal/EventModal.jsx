import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EventModal extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.openEventModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.eventModalInfo !== null ? `Событие ${this.props.eventModalInfo.day}.${this.props.eventModalInfo.month}.${this.props.eventModalInfo.year} (${this.props.eventModalInfo.startHours}:${this.props.eventModalInfo.startMinutes}-${this.props.eventModalInfo.endHours}:${this.props.eventModalInfo.endMinutes})` : ''}
                    </DialogTitle>
                    <DialogContent>  
                        {this.props.eventModalInfo !== null ? this.props.eventModalInfo.description : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onCloseEventModal} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(
    state => ({
        openEventModal: state.modal.openEventModal,
        eventModalInfo: state.events.eventModalInfo
      }),
      dispatch => ({
        onCloseEventModal: () => {
          dispatch({ type: 'OPEN_EVENT_MODAL', payload: false })
        }            
      })
)(EventModal);