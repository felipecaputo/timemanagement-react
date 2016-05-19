'use strict';

import * as React from 'react';
import ActionCreator from '../../actions/ActivityActionCreator';
import Cons from '../../constants/ActivityConstants';
import { humanizedDuration } from '../../util/TimeUtils';

export class ActivityChronometer extends React.Component {
    constructor (props) {
        super(props);
        this.state = { currentDuration: props.activity.totalDuration };
        
        this._tick = this._tick.bind(this);
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
    _tick() {
        let act = this.props.activity;
        let cur = this.__activityIsRunning() ? new Date().getTime() - act.lastStartTime : 0;
        this.setState({
            currentDuration: act.totalDuration + cur
        });
    }
    render(){
        return <span className='chronometer'>{ humanizedDuration(this.state.currentDuration) }</span>
    }
}


ActivityChronometer.propTypes = {
    activity: React.PropTypes.object.isRequired
}

export const ActivityStartStopButton = props => {
    let button;
    
    if(props.activity.lastEndTime === Cons.INVALID_ENDTIME){
        button = (
            <button 
                className="btn btn-lg btn-danger" 
                onClick={() => ActionCreator.stopActivity(props.activity)}
            >
                <span className="glyphicon glyphicon-stop"></span>
            </button>
        )
    }  else {
        button = (
            <button 
                className="btn btn-lg btn-success" 
                onClick={() => ActionCreator.startActivity(props.activity) }
                disabled={props.activity.status !== Cons.ACTIVITY_STATUS.ACTIVE}
            >
                <span className="glyphicon glyphicon-play"></span>
            </button>
        )     
    }
    
    return button;    
}

ActivityStartStopButton.propTypes = {
    activity: React.PropTypes.object.isRequired
}

export const ActivityFinishButton = props => {
    return (
        <button 
            className="btn btn-sm btn-primary" 
            onClick={() => ActionCreator.finishActivity(props.activity) }
            disabled={props.activity.status !== Cons.ACTIVITY_STATUS.ACTIVE}
            title='Finishes this activity'
        >
            <i className="glyphicon glyphicon-ok"></i>
        </button>
    )
} 

ActivityFinishButton.propTypes = {
    activity: React.PropTypes.object.isRequired
}