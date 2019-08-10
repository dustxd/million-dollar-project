import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import AddDialog from './AddDialog';

const styles = {
  rightIcon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const overviewActionButtons = [
  { key: 'dated', title: 'Add daily entry', icon: 'calendar_today' },
  { key: 'collection', title: 'Add collection', icon: 'list_alt' },
  // { key: 'recent', title: 'Last entry', icon: 'access_time' },
];

class OverviewActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddDialog: false,
      type: '',
    };
  }

  onClickActionButton = (key) => {
    // Check if key belongs to any of the overview action buttons
    const actionButton = overviewActionButtons.find(button => button.key === key);

    if (!actionButton) {
      return;
    }

    this.setState({
      openAddDialog: true,
      type: key,
    });
  }

  onClickCloseDialog = () => {
    this.setState({ openAddDialog: false, type: '' });
  }

  render() {
    const { classes, actions } = this.props;
    const { openAddDialog, type } = this.state;

    return (
      <div className={classes.buttonsContainer}>
        {
          overviewActionButtons.map(button => (
            <Button
              color="primary"
              key={button.key}
              variant="contained"
              size="large"
              onClick={() => this.onClickActionButton(button.key)}
            >
              {button.title}
              <Icon className={classes.rightIcon}>{button.icon.toString()}</Icon>
            </Button>
          ))
        }
        {
          openAddDialog
            && (
              <AddDialog
                open={openAddDialog}
                mode="add"
                type={type}
                actions={actions}
                onClickCloseDialog={() => this.onClickCloseDialog()}
              />
            )
        }
      </div>
    );
  }
}

export default withStyles(styles)(OverviewActions);
