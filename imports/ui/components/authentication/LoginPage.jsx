import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import SignUpDialog from './SignUpDialog';

const textFields = [
  { key: 'email', title: 'EMAIL', type: 'string' },
  { key: 'password', title: 'PASSWORD', type: 'password' },
];

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logo: {
    width: '300px',
    marginTop: '50px',
  },
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px',
  },
  textFieldTitle: {
    color: '#a7a9ac',
    fontSize: '14px',
    marginBottom: '5px',
  },
  textFieldStyle: {
    width: '400px',
    maxWidth: '400px',
    color: '#000000',
  },
  button: {
    width: '400px',
    padding: '10px',
    margin: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      openSignUpDialog: false,
    };
  }

  onClickLogin = () => {
    const { actions, history } = this.props;
    const { email, password } = this.state;

    // Set up client side on successful login hook
    Accounts.onLogin(() => {
      history.push('/');
    });

    // Fire login action
    actions.loginUser({ email, password });
  }

  onClickSignUp = () => {
    this.setState({ openSignUpDialog: true });
  }

  onClickCloseDialog = () => {
    this.setState({ openSignUpDialog: false });
  }

  handleTextFieldChange = (event, field) => {
    this.setState({ [field]: event.target.value });
  }

  handleOnKeyPress = (event) => {
    const { email, password } = this.state;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!email || !password) return;
      this.onClickLogin();
    }
  }

  render() {
    const { classes, actions } = this.props;
    const { email, password, openSignUpDialog } = this.state;

    return (
      <div className={classes.pageContainer}>
        <img src="/images/million-dollar-logo.png" alt="logo" className={classes.logo} />
        {
          textFields.map(textField => (
            <div key={textField.key} className={classes.textFieldContainer}>
              <Typography className={classes.textFieldTitle}>
                {textField.title}
              </Typography>
              <TextField
                className={classes.textFieldStyle}
                type={textField.type}
                onChange={event => this.handleTextFieldChange(event, textField.key)}
                onKeyPress={event => this.handleOnKeyPress(event)}
              />
            </div>
          ))
        }
        <Button
          className={classes.button}
          variant="outlined"
          disabled={!(email && password)}
          onClick={() => this.onClickLogin()}
        >
          LOGIN
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => this.onClickSignUp()}
        >
          SIGN UP
        </Button>
        {
          openSignUpDialog
            ? (
              <SignUpDialog
                open={openSignUpDialog}
                actions={actions}
                onClickCloseDialog={() => this.onClickCloseDialog()}
              />
            )
            : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(LoginPage));
