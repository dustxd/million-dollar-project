import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../css/overviewPage/Overview.css';
import AddEntry from '@material-ui/icons/AddBox';
import AddCollection from '@material-ui/icons/PlaylistAdd';
import LastEntry from '@material-ui/icons/AccessTime';
import AddDialog from './AddDialog';

const buttonStyles = makeStyles(theme => ({
  rightIcon: {
    margin: theme.spacing(5),
  },
}));


const overviewActionButtons = [
  { key: 'dated', title: 'Add daily entry', icon: <AddEntry className={buttonStyles.rightIcon} /> },
  { key: 'collection', title: 'Add collection', icon: <AddCollection className={buttonStyles.rightIcon} /> },
  { key: 'recent', title: 'Last entry', icon: <LastEntry className={buttonStyles.rightIcon} /> },
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
    const { actions } = this.props;
    const { openAddDialog, type } = this.state;

    return (
      <div>
        <div className="button-container">
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
                {button.icon}
              </Button>
            ))
          }
        </div>
        {
          openAddDialog
            && (
              <AddDialog
                open={openAddDialog}
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

export default OverviewActions;
