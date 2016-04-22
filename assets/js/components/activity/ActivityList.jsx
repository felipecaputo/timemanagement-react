'use strict';

import * as React from 'react';
import ActivityCard from './ActivityCard';
import ActivityUtils from '../../util/ActivityUtils';
import ActivityStore from '../../stores/ActivityStore';

export default class ActivityList extends React.Component {
    constructor(){
        super();
        this.state = { activityList: ActivityStore.getActivityList() };
        this.__handleChange = this.__handleChange.bind(this);
        this.listenerToken;
    }
    __handleChange() {
        this.setState({
            activityList: ActivityStore.getActivityList()
        });
    } 
    componentDidMount(){
        this.listenerToken = ActivityStore.addListener(this.__handleChange);
    }
    componentWillUnmount() {
        this.listenerToken.remove();
    }
    render(){
        var activityList = this.state.activityList || [];
        var activityElements = [];
        activityList.forEach( activity => {
            activityElements.push(<ActivityCard key={ activity.id } activity= { activity }/>);    
        });
        
        return (
        <div className="container">
            {activityElements}
          </div>  
        );
    }
}
