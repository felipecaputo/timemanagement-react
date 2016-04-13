'use strict';

import * as React from 'react';
import ActivityCard from './ActivityCard';
import ActivityUtils from '../../util/ActivityUtils';
import ActivityStore from '../../stores/ActivityStore';

export default class ActivityList extends React.Component {
    constructor(){
        super();
    }
    componentDidMout(){
        
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

ActivityList.propTypes = {
    activityList: React.PropTypes.array.isRequired
};
