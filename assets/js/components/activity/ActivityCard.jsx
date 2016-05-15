import * as React from 'react';
import * as ActivityControls from './ActivityControls';
import Cons from '../../constants/ActivityConstants';

export default (props) => {
    let activity = props.activity,
        cardClass = 'activity-card',
        activityInfo;
        
    if (activity.status === Cons.ACTIVITY_STATUS.FINISHED) {
        cardClass += ' activity-card-finished';
        activityInfo = <span className='info-finished'>Finished</span>;
    }
    
    return (
        <div className={cardClass}>
            {activityInfo}
            <h3>
                { activity.title }
            </h3>
            <div className="clearfix">
                <div className='pull-left'>
                    Category: <b>{activity.category}</b>
                </div>
                <div className="pull-right">
                    Project: <b>{activity.project}</b>
                </div>
            </div>
            <div>
                {activity.description}
            </div>
            <div>
                <ActivityControls.ActivityChronometer activity= { activity }/>
            </div>
            <ActivityControls.ActivityStartStopButton activity= { activity }/>
            <ActivityControls.ActivityFinishButton activity={activity} />
        </div>
    );
}