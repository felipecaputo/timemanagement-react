'use strict';

import * as React from 'react';
import ActivityList from './activity/ActivityList';
import AppTile from './AppTitle';
import AppToolBar from './AppToolBar';
import ActivityStore from '../stores/ActivityStore';

export default class TimeManagementApp extends React.Component {
    constructor(){
        super();
        ActivityStore.getActivities();
    }
    render(){
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar />
                <hl/>
                <div className='container'>
                    <ActivityList />
                </div>
            </div>
        );
    }
}