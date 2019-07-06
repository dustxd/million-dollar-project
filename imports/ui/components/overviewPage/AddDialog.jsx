import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';

const entryInfoFields = [
  { key: 'header', title: 'HEADER', type: 'textField' },
  // { key: 'type', title: 'TYPE', type: 'select' },
];

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      type: '',
    };
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  }

  onClickAdd = () => {
    const { actions, handleCloseDialog } = this.props;
    const { header } = this.state;

    const newEntry = {
      header,
      type: 'collection',
      createdAt: new Date(),
    };

    actions.addResource(newEntry, 'entries');

    handleCloseDialog();
  }

  getInputComponent = (infoField) => {
    const { type, key } = infoField;

    if (type === 'textField') {
      return (
        <TextField
          onChange={e => this.onChangeTextField(key, e)}
        />
      );
    }

    return null;
  }

  render() {
    const { open, handleCloseDialog } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>CREATE AN ENTRY</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a header.
          </DialogContentText>
          {
            entryInfoFields.map(infoField => (
              <div key={infoField.key}>
                <Typography>
                  {infoField.title}
                </Typography>
                { this.getInputComponent(infoField) }
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={() => this.onClickAdd()}>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddDialog;
