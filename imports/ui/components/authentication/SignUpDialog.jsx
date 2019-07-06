import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class FormDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleClose = () => {
    this.props.closeDialog;
  }

  handleChange(event) {
    this.setState({password: event.target.password});
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  render() {
    return (
      <Dialog
        open
        onClose={this.handleClose()}
        area-labelledby="sign-up-dialog"
     >
        <DialogTitle id="sign-up-title">SIGN UP</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Almost ready to go!
          </DialogContentText>
          <TextField
            margin="dense"
            id="username"
            label="USERNAME"
            type="username"
            fullWidth
        />
          <TextField
            margin="dense"
            id="email"
            label="EMAIL"
            type="username"
            fullWidth
        />
          <TextField
            margin="dense"
            id="password"
            label="PASSWORD"
            type={this.state.showPassword ? 'text' : 'password'}
            fullWidth
            value={this.state.password}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog}>
            Cancel
          </Button>
          <Button onClick={this.props.closeDialog}>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
