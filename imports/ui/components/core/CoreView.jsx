import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
import { AppBar, Button, Typography } from '@material-ui/core';

class CoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMessage: '',
      openMessageDialog: false,
      selectedMessageId: -1, // entries array has indices between 0 and n-1
    };
  }

  handleTextChange = event => {
    this.setState({
      inputMessage: event.target.value,
    });
  }

  addMessage = () => {
    const { addMessage } = this.props;
    const { inputMessage } = this.state;

    if (inputMessage) {
      addMessage(inputMessage);
      this.clearMessage();
    }
  }

  clearMessage = () => {
    this.setState({ inputMessage: '' });
  }

  viewMessage = (index) => {
    this.setState({
      openMessageDialog: true,
      selectedMessageId: index,
    });
  }

  deleteMessage = (index) => {
    const { deleteMessage } = this.props;
    deleteMessage(index);
  }

  deleteAllMessages = () => {
    const { deleteAllMessages } = this.props;
    deleteAllMessages();
  }

  handleKeyPress = (event) => {
    const { addMessage } = this.props;
    const { inputMessage } = this.state;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputMessage) {
        addMessage(inputMessage);
        this.clearMessage();
      }
    }
  }

  handleCloseDialog = () => {
    this.setState({ openMessageDialog: false });
  }

  render() {
    const { entries } = this.props;

    return (
      <AppBar
        color="default"
        position="absolute"
        // className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <Typography variant="title" color="inherit" noWrap>
            Welcome, {user.firstName} {user.lastName}!
          </Typography> */}
          <Typography
            style={{
              marginLeft: '30px', textDecoration: 'underline', color: '#37aab1', cursor: 'pointer',
            }}
            onClick={this.handleSignout}
          >
            Sign out
            </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ letterSpacing: '2px', paddingRight: '20px', paddingLeft: '20px' }}
          // className={classes.button}
          onClick={() => this.onClickBookSurgery()}
        >
          Book Surgery
          </Button>
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return { entries: state.entries };
}

const mapDispatchToProps = dispatch => ({
  addMessage: message => dispatch(Actions.addMessage(message)),
  deleteMessage: index => dispatch(Actions.deleteMessage(index)),
  deleteAllMessages: () => dispatch(Actions.deleteAllMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreView);
