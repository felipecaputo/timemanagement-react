import * as React from 'react';
import ActivityList from './ActivityList';
import EditActivityDiv from './EditActivityDiv';
import ActivityDetails from './ActivityDetailsModal';

const FinishedActivities = props => {
    if (!props.showFinished) return <div />;

    return (
        <div>
            <h4>Finished Activities</h4>
            <ActivityList {...props} activities={props.finishedActivities}/>
        </div>
    )
}

const CurrentActivities = props => {
    return (
        <div>
            <h4>Current Activities</h4>
            <ActivityList {...props}/>
        </div>
    )

}

const EditDiv = props => {
    if(!props.showingCreate) return <div />
    
    return (
        <EditActivityDiv  {...props}
                show={ props.showingCreate } 
                onSave={props.onSaveActivity} 
                onCancel={props.onCancelEdit}
            />        
    )
}

const ActivityDetails = props => {    
    return (
        <ActivityDetails
            {...props}
            show={props.editingActivity}
            activity={props.editingActivity}  
        />
    )
}

export default function ActivityContainer(props) {
    return (
        <div>
            <EditDiv {...props} />
            <CurrentActivities {...props}/>
            <FinishedActivities {...props}/>
        </div>
    )
}