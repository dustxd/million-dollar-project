import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core';

import {
  BULLET_DEFINITION,
  TASK_STATUS,
  TASK,
} from '../../constants/ResourceConstants';

const styles = {
  itemTextField: {

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

  handleClickLineItem = () => {
    const { onClickLineItem, id } = this.props;

    onClickLineItem(id);
  }

  handleAddOrUpdateLineItem = () => {
    const { onClickAddOrUpdateLineItem, id } = this.props;
    const { bullet, text } = this.state;

    const isTask = TASK_STATUS.some(taskStatus => taskStatus === bullet);
    const newLineItem = {
      type: isTask ? TASK : bullet,
      status: isTask ? bullet : undefined,
      content: text,
    };

    onClickAddOrUpdateLineItem(newLineItem, id);
  }

  getBulletIcon = (currentType) => {
    const currentBullet = BULLET_DEFINITION.find(bullet => bullet.type === currentType);
    if (!currentBullet) {
      return null;
    }
    return currentBullet.icon;
  }

  render() {
    const { classes, id, selectedLineItem } = this.props;
    const { bullet, text } = this.state;
    const isSelected = id === selectedLineItem;

    return (
      <div>
        <ListItem
          selected={isSelected}
          onClick={() => this.handleClickLineItem()}
        >
          <ListItemIcon onClick={() => this.onClickBullet()}>
            <Icon>{this.getBulletIcon(bullet)}</Icon>
          </ListItemIcon>
          <TextField
            autoFocus={isSelected}
            className={classes.itemTextField}
            defaultValue={text}
            InputProps={{
              disableUnderline: true,
            }}
            onChange={e => this.onChangeContent(e)}
          />
          {
            isSelected
              ? (
                <ListItemSecondaryAction>
                  <IconButton
                    disabled={!text}
                    onClick={() => this.handleAddOrUpdateLineItem()}
                  >
                    <Icon>save</Icon>
                  </IconButton>
                  <IconButton
                    onClick={() => {}}
                  >
                    <Icon>close</Icon>
                  </IconButton>
                </ListItemSecondaryAction>
              )
              : null
          }
        </ListItem>
      </div>
    );
  }
}

LineItem.defaultProps = {
  item: {},
};

export default withStyles(styles)(LineItem);
