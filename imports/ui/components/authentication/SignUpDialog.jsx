import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends Component {

  handleClose = () => {
    this.props.closeDialog;
  }


  render() {
    return (
      <Dialog
        open
        onClose={this.handleClose()}
        area-labelledby="sign-up-dialog"
     >
        <DialogTitle id="sign-up-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Almost ready to go!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
        />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
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


// export default function FormDialog() {
//   // const [open, setOpen] = React.useState(false);
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: this.props.state
//     };
//   }

//   function handleOpen(){
//     this.setState({open: true});
//   }

//   function handleClose(){
//     this.setState({open: false});
//     // setOpen(false);
//   }

//   return(
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       area-labelledby="sign-up-dialog"
//     >
//       <DialogContent>
//         <DialogContentText>
//           Testing 1 2 3
//         </DialogContentText>
//       </DialogContent>
//     </Dialog>
//   )
// }
