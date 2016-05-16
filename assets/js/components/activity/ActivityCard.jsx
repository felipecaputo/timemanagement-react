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
            <div className='row'>
                {activityInfo}
                <div className='col-md-3'>
                    <ActivityControls.ActivityStartStopButton activity= { activity }/>
                </div>
                <div className='col-md-9'>
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
                    <ActivityControls.ActivityFinishButton activity={activity} />
                </div>
            </div>
        </div>
    );
}