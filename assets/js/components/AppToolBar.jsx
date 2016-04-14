'use strict';

import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ActivityActions from '../actions/ActivityActionCreator';

export default class AppToolBar extends React.Component {
    constructor(){
        super();
        this._handleCreateNew = this._handleCreateNew.bind(this);
    }
    _handleCreateNew() {
        this.props.onCreateNewActivity();
    }
    render(){
        return (
            <div className='container'>
                <div id='toolbar-right'>
                    <Button bsStyle='primary' onClick={this._handleCreateNew}>
                        <span className='glyphicon glyphicon-plus'></span>
                        New Activity 
                    </Button>
                </div>
            </div>
        )
    }
}

AppToolBar.propTypes = {
    onCreateNewActivity: React.PropTypes.func.isRequired
}