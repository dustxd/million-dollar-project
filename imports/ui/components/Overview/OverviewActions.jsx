import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import '../../css/overview/Overview.css';

const buttonStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}))


class OverviewActions extends React.Component{

    
    render(){
        return (
            <div className="button-container">
            <Button variant="contained" className={buttonStyles.button}>Add daily entry</Button>
            <Button variant="contained" className={buttonStyles.button}>Add collection</Button>
            <Button variant="contained" className={buttonStyles.button}>Last entry</Button>
            </div>
        );
    }
}

export default OverviewActions;