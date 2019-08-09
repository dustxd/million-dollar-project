import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  BULLET_DEFINITION,
  TASK_STATUS,
  LINE_ITEM_TYPES,
} from '../../../constants/ResourceConstants';

const styles = {
  itemTextField: {

  },
  disabledLineItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5em',
  },
  disabledLineItemText: {
    paddingLeft: '1em',
  },
  listItemSecondaryAction: {
    paddingRight: '120px',
  },
};

class LineItem extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    const { status, type, content } = item;
    this.state = {
      bullet: status || type || BULLET_DEFINITION[0].type,
      text: content || '',
    };
    this.initialState = this.state;
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    const isSelected = this.isLineItemSelected();

    if (!isSelected) {
      if (prevProps.selectedLineItem === id) {
        // If current line item is deselected, reset to its original state
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(this.initialState);
      }
    }
  }

  onClickBullet = () => {
    const { bullet } = this.state;
    const numberOfTypes = BULLET_DEFINITION.length;
    const currentIndex = BULLET_DEFINITION.findIndex(def => def.type === bullet);
    const newIndex = (currentIndex + 1) % numberOfTypes;
    const newBullet = BULLET_DEFINITION[newIndex].type;
    this.setState({ bullet: newBullet });
  }

  onChangeContent = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  onKeyPress = (event) => {
    const { text } = this.state;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!text) return;
      this.handleAddOrUpdateLineItem();
    }
  }

  handleClickLineItem = () => {
    const { onClickLineItem, id } = this.props;

    onClickLineItem(id);
  }

  handleAddOrUpdateLineItem = () => {
    const { onClickAddOrUpdateLineItem, id } = this.props;
    const { bullet, text } = this.state;

    const isTask = TASK_STATUS.some(taskStatus => taskStatus === bullet);
    const newLineItem = {
      type: isTask ? LINE_ITEM_TYPES.TASK : bullet,
      status: isTask ? bullet : undefined,
      content: text,
    };

    onClickAddOrUpdateLineItem(newLineItem, id);
  }

  handleRemoveLineItem = () => {
    const { onClickRemoveLineItem, id } = this.props;

    onClickRemoveLineItem(id);
  }

  isLineItemSelected = () => {
    const { id, selectedLineItem } = this.props;
    return id === selectedLineItem;
  }

  getBulletIcon = (currentType) => {
    const currentBullet = BULLET_DEFINITION.find(bullet => bullet.type === currentType);
    if (!currentBullet) {
      return null;
    }
    return currentBullet.icon;
  }

  render() {
    const { classes, disabled } = this.props;
    const { bullet, text } = this.state;
    const isSelected = this.isLineItemSelected();

    return (
      <div>
        {
          disabled
            ? (
              <div className={classes.disabledLineItem}>
                <Icon color="primary">{this.getBulletIcon(bullet)}</Icon>
                <Typography className={classes.disabledLineItemText}>{text}</Typography>
              </div>
            )
            : (
              <ListItem
                selected={isSelected}
                onClick={() => this.handleClickLineItem()}
                classes={{
                  secondaryAction: classes.listItemSecondaryAction,
                }}
              >
                <ListItemIcon onClick={() => this.onClickBullet()}>
                  <Icon color="primary">{this.getBulletIcon(bullet)}</Icon>
                </ListItemIcon>
                {
                  disabled
                    ? (
                      <Typography>{text}</Typography>
                    )
                    : (
                      <TextField
                        multiline
                        fullWidth
                        autoFocus={isSelected}
                        className={classes.itemTextField}
                        value={text}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        onChange={e => this.onChangeContent(e)}
                        onKeyPress={e => this.onKeyPress(e)}
                      />
                    )
                }
                {
                  isSelected
                    ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          disabled={!text}
                          onClick={() => this.handleAddOrUpdateLineItem()}
                        >
                          <Icon color="secondary">save</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleRemoveLineItem()}
                        >
                          <Icon color="secondary">close</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    )
                    : null
                }
              </ListItem>
            )
        }
      </div>
    );
  }
}

LineItem.defaultProps = {
  item: {},
};

export default withStyles(styles)(LineItem);
