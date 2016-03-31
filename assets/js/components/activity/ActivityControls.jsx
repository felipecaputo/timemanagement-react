'use strict';

import React from 'react';

export default class ActivityControls extends React.Component {
    render() {
        let activity = this.props.activity;
        let button;
        if(activity.running){
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