'use strict';

import * as React from 'react';
import ActivityCard from './ActivityCard';
import ActivityUtils from '../../util/ActivityUtils';

export default class ActivityList extends React.Component {
    constructor(){
        super();
        this.state = {activityList: []};
    }
    componentDidMount() {
        ActivityUtils.getCurrentActivities()
            .then(returnedActivityList => {
                this.setState({
                    activityList: returnedActivityList
                });
            })
    }
    render(){
        // var activityList = this.props.activityList || [];
        let activityList = this.state.activityList;
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

