import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const signUpInfoFields = [
  { key: 'firstName', title: 'FIRST NAME', type: 'string' },
  { key: 'lastName', title: 'LAST NAME', type: 'string' },
  { key: 'email', title: 'EMAIL', type: 'string' },
  { key: 'password', title: 'PASSWORD', type: 'password' },
];

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  onClickSignUp = () => {
    const { onClickCloseDialog } = this.props;

    // TODO: Add sign up logic

    onClickCloseDialog();
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({ [fieldKey]: event.target.value });
  }

  onClickPasswordVisibility = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  onKeyPress = (event) => {
    const { email, password } = this.state;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!email || !password) return;
      this.onClickSignUp();
    }
  }


  renderInputComponent = (infoField) => {
    const { showPassword } = this.state;
    const { key, type } = infoField;

    if (type === 'password') {
      return (
        <TextField
          type={showPassword ? 'string' : 'password'}
          onChange={e => this.onChangeTextField(key, e)}
          onKeyPress={e => this.onKeyPress(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => this.onClickPasswordVisibility()}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    }

    return (
      <TextField
        type={type}
        onChange={e => this.onChangeTextField(key, e)}
        onKeyPress={e => this.onKeyPress(e)}
      />
    );
  }

  render() {
    const { classes, open, onClickCloseDialog } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClickCloseDialog}
        area-labelledby="sign-up-dialog"
      >
        <DialogTitle id="sign-up-title">SIGN UP</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Almost ready to go!
          </DialogContentText>
          {
            signUpInfoFields.map(infoField => (
              <div key={infoField.key}>
                <Typography>{infoField.title}</Typography>
                { this.renderInputComponent(infoField) }
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCloseDialog}>
            Cancel
          </Button>
          <Button onClick={() => this.onClickSignUp()}>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignUpDialog;
