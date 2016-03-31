'use strict';

import React from 'react';
import ActivityCard from './ActivityCard.jsx';

export default class ActivityList extends React.Component {
    constructor(){
        super();
        
    }
    render(){
        var activityList = this.props.activityList || [];
        
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