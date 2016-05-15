'use strict';

import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ActivityActions from '../actions/ActivityActionCreator';

const AppToolBar = (props) => {
    return (
        <div className='container'>
            <div id='toolbar-right'>
                <Button bsStyle='success' onClick={props.onCreateNewActivity}>
                    <span className='glyphicon glyphicon-plus'></span>
                    New Activity
                </Button>
                <Button
                    bsStyle='primary'
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