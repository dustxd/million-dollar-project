import React, { Component } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  dialogTitleRoot: {
    padding: '24px',
  },
  closeButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  dialogContentRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '200px',
  },
  textField: {
    width: '400px',
    margin: '10px',
  },
  textFieldInput: {
    height: '15px',
  },
  inputLabelRoot: {

  },
  createButton: {
    boxShadow: 'none',
    width: '400px',
    height: '50px',
    color: '#ffffff',
    padding: '14px',
    marginTop: '20px',
    marginBottom: '30px',
  },
};

const signUpInfoFields = [
  { key: 'firstName', title: 'First Name', type: 'string' },
  { key: 'lastName', title: 'Last Name', type: 'string' },
  { key: 'email', title: 'Email', type: 'string' },
  { key: 'password', title: 'Password', type: 'password' },
];

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    const signUpFields = this.initializeSignUpInfoFields();
    this.state = {
      ...signUpFields,
      showPassword: false,
    };
  }

  initializeSignUpInfoFields = () => {
    const state = {};
    signUpInfoFields.forEach((field) => {
      state[field.key] = '';
    });
    return state;
  }

  onClickSignUp = () => {
    const { actions, onClickCloseDialog } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    actions.signUpUser({
      firstName,
      lastName,
      email,
      password,
    });

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
    const { classes } = this.props;
    const { showPassword } = this.state;
    const { key, title, type } = infoField;

    // Handle password related UI
    let fieldType = type;
    if (type === 'password' && showPassword) {
      fieldType = 'string';
    }

    const endAdornment = type === 'password'
      ? (
        <InputAdornment position="end">
          <IconButton onClick={() => this.onClickPasswordVisibility()}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
      : null;

    return (
      <TextField
        key={key}
        variant="outlined"
        className={classes.textField}
        label={title}
        type={fieldType}
        onChange={e => this.onChangeTextField(key, e)}
        onKeyPress={e => this.onKeyPress(e)}
        InputProps={{
          endAdornment,
          classes: {
            input: classes.textFieldInput,
          },
        }}
        InputLabelProps={{
          classes: {
            root: classes.inputLabelRoot,
          },
        }}
      />
    );
  }

  render() {
    const { classes, open, onClickCloseDialog } = this.props;

    return (
      <Box color="primary.main">
        <Dialog
          open={open}
          onClose={onClickCloseDialog}
        >
          <DialogTitle disableTypography classes={{ root: classes.dialogTitleRoot }}>
            <IconButton className={classes.closeButton} onClick={onClickCloseDialog}>
              <Icon>close</Icon>
            </IconButton>
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogContentRoot }}>
            <img src="/images/million-dollar-logo.png" alt="logo" className={classes.logo} />
            {
              signUpInfoFields.map(infoField => (
                this.renderInputComponent(infoField)
              ))
            }
            <Button
              variant="contained"
              className={classes.createButton}
              onClick={() => this.onClickSignUp()}
            >
              CREATE ACCOUNT
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
}

export default withStyles(styles)(SignUpDialog);
