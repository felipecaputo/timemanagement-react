import * as React from 'react';
import * as ActivityControls from './ActivityControls';

export default (props) => {
    var activity = props.activity;
    return (
        <div className="activity-card">
            <h2>
                { activity.title }
            </h2>
            <div className="clearfix">
                <div className='pull-left'>
                    <b>{activity.category}</b>
                </div>
                <div className="pull-right">
                    <b>{activity.project}</b>
                </div>
            </div>
            <div>
                {activity.description}
            </div>
            <ActivityControls.ActivityChronometer activity= { activity }/>
            <ActivityControls.ActivityStartStopButton activity= { activity }/>
            <ActivityControls.ActivityFinishButton activity={activity} />
        </div>
    );
}