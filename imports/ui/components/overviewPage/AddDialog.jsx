import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';

import { ADD_DATED_ENTRY_DIALOG, ADD_COLLECTION_DIALOG } from '../../constants/ResourceConstants';

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
  textField: {
    width: '400px',
    margin: '10px',
    '& label.Mui-focused': {
      color: '#868735',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#bec358',
      },
      '&:hover fieldset': {
        borderColor: '#868735',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#868735',
      },
    },
  },
  textFieldInput: {
    height: '15px',
  },
  inputLabelRoot: {
    color: '#bec358',
  },
  addButton: {
    boxShadow: 'none',
    width: '400px',
    height: '50px',
    backgroundColor: '#868735',
    color: '#ffffff',
    padding: '14px',
    marginTop: '20px',
    marginBottom: '30px',
  },
};

class AddDialog extends Component {
  constructor(props) {
    super(props);

    const { type } = props;
    let header = '';

    if (type === 'dated') {
      header = new Date();
    }

    this.state = {
      header,
    };
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  }

  onChangeDateField = (date) => {
    this.setState({
      header: date,
    });
  }

  onClickAdd = () => {
    const { actions, onClickCloseDialog } = this.props;
    const { header } = this.state;

    const newEntry = {
      header,
      type: 'collection',
      createdAt: new Date(),
    };

    actions.addResource(newEntry, 'entries');

    onClickCloseDialog();
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
    const { classes } = this.props;
    const { header } = this.state;
    const { type, key, title } = infoField;

    if (type === 'textField') {
      return (
        <TextField
          variant="outlined"
          className={classes.textField}
          label={title}
          onChange={e => this.onChangeTextField(key, e)}
          onKeyPress={e => this.onKeyPress(e)}
          InputProps={{
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

    if (type === 'date') {
      return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className={classes.textField}
            format="DD/MM/YYYY"
            value={header}
            onChange={date => this.onChangeDateField(date)}
          />
        </MuiPickersUtilsProvider>
      );
    }

    return null;
  }

  render() {
    const { open, onClickCloseDialog, classes } = this.props;
    const dialog = this.getDialogInfo();
    const {
      title,
      subtitle,
      fields,
      actions,
    } = dialog;

    return (
      <Dialog
        open={open}
        onClose={onClickCloseDialog}
      >
        <DialogTitle disableTypography classes={{ root: classes.dialogTitleRoot }}>
          {title}
          <IconButton className={classes.closeButton} onClick={onClickCloseDialog}>
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          <DialogContentText>
            {subtitle}
          </DialogContentText>
          {
            fields.map(infoField => (
              <div key={infoField.key}>
                { this.renderInputComponent(infoField) }
              </div>
            ))
          }
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => this.onClickAdd()}
          >
            {actions.addButton}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddDialog);
