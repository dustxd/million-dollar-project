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

  onKeyPress = (event) => {
    const { header } = this.state;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!header) return;
      this.onClickAdd();
    }
  }

  renderInputComponent = (infoField) => {
    const { type, key } = infoField;

    if (type === 'textField') {
      return (
        <TextField
          onChange={e => this.onChangeTextField(key, e)}
          onKeyPress={e => this.onKeyPress(e)}
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
                { this.renderInputComponent(infoField) }
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            CANCEL
          </Button>
          <Button onClick={() => this.onClickAdd()}>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddDialog;
