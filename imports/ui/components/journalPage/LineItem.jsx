import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
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
    const { onClickLineItem, key } = this.props;

    onClickLineItem(key);
  }

  handleAddLineItem = () => {
    const { onClickAddLineItem } = this.props;
    const { bullet, text } = this.state;

    const isTask = TASK_STATUS.some(taskStatus => taskStatus === bullet);

    onClickAddLineItem({
      type: isTask ? TASK : bullet,
      status: isTask ? bullet : undefined,
      content: text,
    });
  }

  getBulletIcon = (currentType) => {
    const currentBullet = BULLET_DEFINITION.find(bullet => bullet.type === currentType);
    if (!currentBullet) {
      return null;
    }
    return currentBullet.icon;
  }

  render() {
    const { classes, key, selectedLineItem } = this.props;
    const { bullet, text } = this.state;
    const isSelected = key === selectedLineItem;

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
                  <Button
                    disabled={!text}
                    onClick={() => this.handleAddLineItem()}
                  >
                    SAVE
                  </Button>
                </ListItemSecondaryAction>
              )
              : null
          }
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(LineItem);
