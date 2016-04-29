'use strict';

import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ActivityActions from '../actions/ActivityActionCreator';

const AppToolBar = (props) => {
    return (
        <div className='container'>
            <div id='toolbar-right'>
                <Button bsStyle='primary' onClick={props.onCreateNewActivity}>
                    <span className='glyphicon glyphicon-plus'></span>
                    New Activity
                </Button>
            </div>
        </div>
    )
}

AppToolBar.propTypes = {
    onCreateNewActivity: React.PropTypes.func.isRequired
}

export default AppToolBar