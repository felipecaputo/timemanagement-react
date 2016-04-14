'use strict';

import * as React from 'react';
import ActivityList from './activity/ActivityList';
import AppTile from './AppTitle';
import AppToolBar from './AppToolBar';
import ActivityAction from '../actions/ActivityActionCreator';
import CreateActivityModal from './activity/CreateActivityModal';

export default class TimeManagementApp extends React.Component {
    constructor(){
        super();
        ActivityAction.getCurrentActivities();
        this.__handleCreateNewActivity= this.__handleCreateNewActivity.bind(this);
        this.state = {
            showingCreate: false
        };
    }
    __handleCreateNewActivity() {
        this.setState({
            showingCreate: true
        })
    }
    render(){
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar onCreateNewActivity={ this.__handleCreateNewActivity }/>
                <hl/>
                <div className='container'>
                    <CreateActivityModal show={ this.state.showingCreate } />
                    <ActivityList />
                </div>
            </div>
        );
    }
}