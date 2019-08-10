import React, { Component } from 'react';
import {
  Box,
  Button,
  Dialog,
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
import moment from 'moment';
import { withRouter } from 'react-router';

import {
  DATED_ENTRY_DIALOG,
  COLLECTION_DIALOG,
  DATE_CONSTRAINTS,
} from '../../constants/ResourceConstants';

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
  },
  textFieldInput: {
    height: '15px',
  },
  inputLabelRoot: {

  },
  actionButton: {
    boxShadow: 'none',
    width: '400px',
    height: '50px',
    color: '#ffffff',
    padding: '14px',
    marginTop: '20px',
    marginBottom: '30px',
  },
};

class AddDialog extends Component {
  constructor(props) {
    super(props);

    const { type, date } = props;
    let header = '';

    if (type === 'dated') {
      header = date || new Date();
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

  onClickAddOrUpdate = async () => {
    const {
      type,
      mode,
      entryId,
      actions,
      onClickCloseDialog,
      history,
    } = this.props;
    const { header } = this.state;

    const newEntry = {
      header: type === 'dated' ? moment(header).toDate() : header,
      type,
    };

    if (mode === 'add') {
      await actions.addResource(newEntry, 'entries');
    } else {
      actions.updateResource(newEntry, 'entries', entryId);
    }

    history.push('/singlePage');
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.isDisabled()) return;
      this.onClickAddOrUpdate();
    }
  }

  getDialogInfo = () => {
    const { type } = this.props;

    if (type === 'dated') {
      return DATED_ENTRY_DIALOG;
    }

    // By default, the dialog should be for adding collection
    return COLLECTION_DIALOG;
  }

  getDialogInfoForMode = () => {
    const { mode } = this.props;

    const dialog = this.getDialogInfo();
    const { addTitle, editTitle, actions, ...dialogProps } = dialog;


    const title = dialog[`${mode}Title`] || '';
    const button = actions[`${mode}Button`] || '';

    return { title, button, ...dialogProps };
  }

  isDisabled = () => {
    const { type } = this.props;
    const { header } = this.state;

    if (type === 'dated') {
      return !moment(header).isValid()
        || !moment(header).isBefore(DATE_CONSTRAINTS.MAX_DATE)
        || !moment(header).isAfter(DATE_CONSTRAINTS.MIN_DATE);
    }

    return !header;
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
            onKeyPress={e => this.onKeyPress(e)}
          />
        </MuiPickersUtilsProvider>
      );
    }

    return null;
  }

  render() {
    const { open, onClickCloseDialog, classes } = this.props;
    const { header } = this.state;
    const dialog = this.getDialogInfoForMode();
    const {
      title,
      subtitle,
      fields,
      button,
    } = dialog;

    return (
      <Box color="primary.main">
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
              color="primary"
              className={classes.actionButton}
              disabled={this.isDisabled()}
              onClick={() => this.onClickAddOrUpdate()}
            >
              {button}
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(AddDialog));
