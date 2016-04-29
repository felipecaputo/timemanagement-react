'use strict';

import * as React from 'react';
import ActivityList from './activity/ActivityList';
import AppTile from './AppTitle';
import AppToolBar from './AppToolBar';
import ActivityAction from '../actions/ActivityActionCreator';
import CreateActivityModal from './activity/CreateActivityModal';
import ActivityStore from '../stores/ActivityStore';

export default class TimeManagementApp extends React.Component {
    constructor(){
        super();
        ActivityAction.getCurrentActivities();
        this.__handleCreateNewActivity= this.__handleCreateNewActivity.bind(this);
        this.__handleCancelActivity = this.__handleCancelActivity.bind(this);
        this.__handleSaveActivity = this.__handleSaveActivity.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        
        this.state = {
            showingCreate: false,
            activities: ActivityStore.getActivityList()
        };
    }
    __handleCreateNewActivity() {
        this.setState({
            showingCreate: true
        })
    }
    __handleSaveActivity(activity) {
        this.setState({
            showingCreate: false
        });
        ActivityAction.createActivity(activity);
    }
    __handleCancelActivity(){
        this.setState({
            showingCreate: false
        })
    }
    __handleChange(){
        this.setState({
            activities: ActivityStore.getActivityList()
        })
    }
    componentDidMount(){
        this.activityToken = ActivityStore.addListener(this.__handleChange);
    }
    componentWillUnmount(){
        this.activityToken();
    }
    render(){
        var createModal;
        if(this.state.showingCreate) {
            createModal = <CreateActivityModal show={ this.state.showingCreate } onSave={this.__handleSaveActivity} onCancel={this.__handleCancelActivity}/>;
        }
         
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar onCreateNewActivity={ this.__handleCreateNewActivity }/>
                <hl/>
                <div className='container'>
                    {createModal}
                    <ActivityList
                        activities={this.state.activities} 
                    />
                </div>
            </div>
        );
    }
}