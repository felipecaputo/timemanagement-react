'use strict';

import * as React from 'react';
import ActionCreator from '../../actions/ActivityActionCreator';
import Cons from '../../constants/ActivityConstants';
import { humanizedDuration } from '../../util/TimeUtils';

export default class ActivityControls extends React.Component {
    constructor(props){
        super(props);
        this.state = { currentDuration: props.activity.totalDuration };
        
        this._handleStart = this._handleStart.bind(this);
        this._handleStop = this._handleStop.bind(this);
        this._tick = this._tick.bind(this);
    }
    _handleStart(){
        ActionCreator.startActivity(this.props.activity);
        
    }
    _handleStop() {
        if(this.intervalId){
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        
        ActionCreator.stopActivity(this.props.activity);
    }
    _tick() {
        let act = this.props.activity;
        this.setState({
            currentDuration: act.totalDuration + (new Date().getTime() - act.lastStartTime)
        });
    }
    __activityIsRunning(){
        return this.props.activity.lastEndTime === Cons.INVALID_ENDTIME;
    }
    componentDidUpdate(prevProps,prevState){
        if ((this.__activityIsRunning())  &&  (!this.intervalId)) {
            this.intervalId = setInterval(this._tick, 200);
        }
        if(((!this.__activityIsRunning())  &&  (this.intervalId))){
            clearInterval(this.intervalId);
            this.intervalId = undefined;            
        }
    }
    componentDidMount(){
        this.intervalId = this.__activityIsRunning() ? setInterval(this._tick, 200) : undefined;
    }
    componentWillUnmount(){
        if(this.intervalId) { 
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    render() {
        let activity = this.props.activity;
        let button;
        
        if(!this.__activityIsRunning()){
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
                    <div className="col-md-4">{ humanizedDuration(this.state.currentDuration) }</div>
                    <div className="col-md-4">{button}</div>
                </div>
            </div>
        )
    }
}

ActivityControls.propTypes = {
    activity: React.PropTypes.object.isRequired
}