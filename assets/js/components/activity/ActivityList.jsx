import * as React from 'react';
import ActivityCard from './ActivityCard';

var ActivityList = props => {
    var activityElements = props.activities.map( activity => {
        return <ActivityCard 
            key={ activity.id } 
            activity= { activity }
            onActivityTitleClick = {props.onActivityTitleClick}
        /> 
    });
    
    return (
        <div>{activityElements}</div>
    );

};

ActivityList.propTypes = {
    activities: React.PropTypes.array.isRequired
}

export default ActivityList;