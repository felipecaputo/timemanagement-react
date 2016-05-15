import * as React from 'react';
import * as ActivityControls from './ActivityControls';

export default (props) => {
    var activity = props.activity;
    return (
        <div className="activity-card">
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