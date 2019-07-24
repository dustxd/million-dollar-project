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

import { ADD_DATED_ENTRY_DIALOG, ADD_COLLECTION_DIALOG } from '../../constants/ResourceConstants';

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

  getDialogInfo = () => {
    const { type } = this.props;

    if (type === 'dated') {
      return ADD_DATED_ENTRY_DIALOG;
    }

    // By default, the dialog should be for adding collection
    return ADD_COLLECTION_DIALOG;
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
    const dialog = this.getDialogInfo();

    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialog.subtitle}
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
            {dialog.actions.addButton}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddDialog;
