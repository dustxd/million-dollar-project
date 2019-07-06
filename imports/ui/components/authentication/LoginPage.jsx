import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import SignUpDialog from './SignUpDialog'

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
  titleText: {
    marginBottom: '50px',
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
      openSignUp: false
    };

  }

  onClickLogin = () => {
    const { actions, history } = this.props;
    // TODO: This needs to be converted to an async/await call when API is connected
    const { ...user } = this.state;
    actions.loginUser(user);
    history.push('/');
  }

  toggleSignUp = () => {
    this.setState({openSignUp: !this.state.openSignUp});
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
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
      <div className={classes.pageContainer}>
        <Typography
          variant="h1"
          className={classes.titleText}
        >
          BULLET JOURNALING
        </Typography>
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
          onClick={() => this.toggleSignUp()}
        >
          SIGN UP
        </Button>
        {this.state.openSignUp?
        <SignUpDialog 
          state = {this.state.openSignUp}
          closeDialog = {this.toggleSignUp.bind(this)}
        /> : null
        }

        
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(LoginPage));
