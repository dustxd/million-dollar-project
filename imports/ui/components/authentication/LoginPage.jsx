import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

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
    };
  }

  onClickLogin = () => {
    // TODO
    const { history } = this.props;
    history.push('/overview');
  }

  handleTextFieldChange = (event, field) => {
    this.setState({ [field]: event.target.value });
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
                onChange={event => this.handleTextFieldChange(event, textField.key)}
                type={textField.type}
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
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(LoginPage));
