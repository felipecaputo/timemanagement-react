'use strict';

import * as React from 'react';
import AppTile from './AppTitle';
import AppToolBar from './AppToolBar';
import ActivityAction from '../actions/ActivityActionCreator';
import ActivityContainer from './activity/ActivityContainer';

import ActivityStore from '../stores/ActivityStore';
import CategoryStore from '../stores/CategoryStore';
import ProjectStore from '../stores/ProjectStore';

export default class TimeManagementApp extends React.Component {
    constructor(){
        super(props);
        this.__handleCreateNewActivity= this.__handleCreateNewActivity.bind(this);
        this.__handleCancelActivity = this.__handleCancelActivity.bind(this);
        this.__handleSaveActivity = this.__handleSaveActivity.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__toggleShowFinished = this.__toggleShowFinished.bind(this);
        this.__toggleEditModal = this.__toggleEditModal.bind(this);
        
        this.state = {
            showingCreate: false,
            activities: ActivityStore.getActivityList(),
            finishedActivities: ActivityStore.getFinishedActivities(),
            categories: CategoryStore.getCategoryList(),
            projects: ProjectStore.getProjectList(),
            showFinished: false
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
            activities: ActivityStore.getActivityList(),
            finishedActivities: ActivityStore.getFinishedActivities(),
            categories: CategoryStore.getCategoryList(),
            projects: ProjectStore.getProjectList()
        })
    }
    componentDidMount(){
        this.activityToken = ActivityStore.addListener(this.__handleChange);
        this.categoryToken = CategoryStore.addListener(this.__handleChange);
        this.projectToken = ProjectStore.addListener(this.__handleChange);
    }
    componentWillUnmount(){
        this.activityToken();
        this.categoryToken();
        this.projectToken();
    }
    __toggleShowFinished(){
        this.setState({
            showFinished: !this.state.showFinished
        })
    }
    __toggleEditModal(activity) {
        this.setState({
            editingActivity: activity
        })
    }
    render(){
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar 
                    onCreateNewActivity={ this.__handleCreateNewActivity }
                    showFinished={this.state.showFinished}
                    onToggleShowFinished={this.__toggleShowFinished}/>
                <hl/>
                <ActivityContainer {...this.state}
                    onActivityTitleClick={this.__toggleEditModal}
                    editingActivity={this.state.editingActivity}
                    onSaveActivity={this.__handleSaveActivity}
                    onCancelEdit={this.__handleCancelActivity}
                />
            </div>
        );
    }
}