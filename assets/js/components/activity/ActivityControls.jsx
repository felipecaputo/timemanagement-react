'use strict';

import * as React from 'react';
import ActionCreator from '../../actions/ActivityActionCreator';

export default class ActivityControls extends React.Component {
    constructor(props){
        super(props);
        this.state = { activity: undefined, counting: false, currentDuration: 0 };
        this._handleStart = this._handleStart.bind(this);
    }
    _handleStart(){
        ActionCreator.startActivity(this.props.activity.id);
    }
    _handleStop() {
        ActionCreator.stopActivity(this.props.activity.id);
    }
    _thick() {
        this.setState({
            currentDuration: this.state.currentDuration + 1
        });
    }
    render() {
        let activity = this.props.activity;
        let button;
        if(!activity.running){
            button = (
                <button className="btn btn-small btn-success" onCLick={this.props.onPlay}>
                    <span className="glyphicon glyphicon-play"></span>
                </button>
            )     
        }  else {
            button = (
                <button className="btn btn-small btn-danger" onCLick={this.props.onPlay}>
                    <span className="glyphicon glyphicon-stop"></span>
                </button>
            )
        }
        
        return button;
    }
}

ActivityControls.propTypes = {
    activity: React.PropTypes.object.isRequired
}