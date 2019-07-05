import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../css/overviewPage/Overview.css';
import AddEntry from '@material-ui/icons/AddBox';
import AddCollection from '@material-ui/icons/PlaylistAdd';
import LastEntry from '@material-ui/icons/AccessTime';

const buttonStyles = makeStyles(theme => ({
  rightIcon: {
    margin: theme.spacing(5),
  },
}));

const overviewActionButtons = [
  { key: 'dated', title: 'Add daily entry', icon: <AddEntry className={buttonStyles.rightIcon} /> },
  { key: 'undated', title: 'Add collection', icon: <AddCollection className={buttonStyles.rightIcon} /> },
  { key: 'recent', title: 'Last entry', icon: <LastEntry className={buttonStyles.rightIcon} /> },
];

class OverviewActions extends React.Component {
  onClickActionButton = (key) => {
    const { actions } = this.props;
    if (key === 'dated') {
      const newEntry = {
        header: 'Moved to Database Test Note',
        type: 'collection',
        createdAt: new Date(),
      };
      actions.addResource(newEntry, 'entries');
    }
  }

  render() {
    return (
      <div className="button-container">
        {
          overviewActionButtons.map(button => (
            <Button
              key={button.key}
              variant="contained"
              onClick={() => this.onClickActionButton(button.key)}
            >
              {button.title}
              {button.icon}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default OverviewActions;
