'use strict';

import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ActivityActions from '../actions/ActivityActionCreator';

const AppToolBar = (props) => {
    return (
        <div>
            <div id='toolbar-right'>
                <Button 
                    bsStyle='success'
                    className='toolbar-button' 
                    onClick={props.onCreateNewActivity}>
                    <span className='glyphicon glyphicon-plus'></span>
                    New Activity
                </Button>
                <Button
                    bsStyle='primary'
                    className='toolbar-button'
                    active={props.showFinished}
                    onClick={props.onToggleShowFinished}
                >
                    Show Finished
                </Button>
            </div>
        </div>
    )
}

AppToolBar.propTypes = {
    onCreateNewActivity: React.PropTypes.func.isRequired,
    onToggleShowFinished: React.PropTypes.func.isRequired,
    showFinished: React.PropTypes.bool.isRequired
}

export default AppToolBar