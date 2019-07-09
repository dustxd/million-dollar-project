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
  { key: 'email', title: 'EMAIL', type: 'textField' },
  { key: 'password', title: 'PASSWORD', type: 'string' },
];

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
    };
  }

  handleSignUp = () => {
    const { onClickCloseDialog } = this.props;
    onClickCloseDialog();
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({ [fieldKey]: event.target.value });
  }

  onClickPasswordVisibility = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  renderInputComponent = (infoField) => {
    const { showPassword } = this.state;
    const { key, type } = infoField;

    if (type === 'password') {
      return (
        <TextField
          type={type}
          onChange={e => this.onChangeTextField(key, e)}
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
          <Button onClick={() => this.handleSignUp()}>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignUpDialog;
