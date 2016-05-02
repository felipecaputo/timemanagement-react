'use strict';

import * as React from 'react';
import ActionCreator from '../../actions/ActivityActionCreator';
import Cons from '../../constants/ActivityConstants';
import { humanizedDuration } from '../../util/TimeUtils';

export default class ActivityControls extends React.Component {
    constructor(props){
        super(props);
        this.state = { running: props.activity.lastEndTime === Cons.INVALID_ENDTIME, currentDuration: 0 };
        
        this._handleStart = this._handleStart.bind(this);
        this._handleStop = this._handleStop.bind(this);
        this._tick = this._tick.bind(this);
    }
    _handleStart(){
        ActionCreator.startActivity(this.props.activity);
        this.setState({
            running: true
        })
        this.intervalId = setInterval(this._tick, 1000);
    }
    _handleStop() {
        clearInterval(this.intervalId);
        ActionCreator.stopActivity(this.props.activity);
        this.setState({
            running: false
        });
    }
    _tick() {
        this.setState({
            currentDuration: this.state.currentDuration + 1000
        });
    }
    render() {
        let activity = this.props.activity;
        let button;
        
        if(!this.state.running){
            button = (
                <button className="btn btn-small btn-success" onClick={this._handleStart}>
                    <span className="glyphicon glyphicon-play"></span>
                </button>
            )     
        }  else {
            button = (
                <button className="btn btn-small btn-danger" onClick={this._handleStop}>
                    <span className="glyphicon glyphicon-stop"></span>
                </button>
            )
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">{ humanizedDuration(this.props.activity.totalDuration + this.state.currentDuration) }</div>
                    <div className="col-md-4">{button}</div>
                </div>
            </div>
        )
    }
}

ActivityControls.propTypes = {
    activity: React.PropTypes.object.isRequired
}