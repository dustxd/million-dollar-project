import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import '../../css/overview/Overview.css';

const overviewActionButtons = [
  { key: 'dated', title: 'Add daily entry', icon: '' },
  { key: 'undated', title: 'Add collection', icon: '' },
  { key: 'recent', title: 'Last entry', icon: '' },
];

const buttonStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


class OverviewActions extends React.Component {
  render(){
    return (
      <div className="button-container">
        {
          overviewActionButtons.map(button => (
            <Button
              variant="contained"
              className={buttonStyles.button}
            >
              {button.title}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default OverviewActions;