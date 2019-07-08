import React, { Component } from 'react';
import Lens from '@material-ui/icons/Lens';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import Done from '@material-ui/icons/Done';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Remove from '@material-ui/icons/Remove';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  // bullet: {
  //   width: '0.25em'
  // }
};
class Bullet extends Component {
  constructor(props) {
    super(props);

  }
  handleClick =(e) => {
    console.log('clicked');
  }
  render() {
    const { classes } = this.props;
    const bulletType = this.props.type;
    let bullet = <div />;
    switch (bulletType) {
      case 'toDo':
        bullet = <Lens />;
        break;
      case 'toDoCompleted':
        bullet = <Done />;
        break;
      case 'toDoScheduled':
        bullet = <ChevronLeft />;
        break;
      case 'toDoMigrated':
        bullet = <ChevronRight />;
        break;
      case 'event':
        bullet = <PanoramaFishEye />;
        break;
      case 'note':
        bullet = <Remove />;
        break;
      default:
        bullet = <div />;
        break;
    }
    // <div className={classes.bullet}>
    return (
      <div onClick={this.handleClick}>
        {bullet}
      </div>
    );
  }
}

export default withStyles(styles)(Bullet);
