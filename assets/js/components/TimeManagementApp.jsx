'use strict';

import * as React from 'react';
import ActivityList from './activity/ActivityList';
import AppTile from './AppTitle';
import AppToolBar from './AppToolBar';
import ActivityAction from '../actions/ActivityActionCreator';
import CreateActivityModal from './activity/CreateActivityModal';
import EditActivityDiv from './activity/EditActivityDiv';
import ActivityStore from '../stores/ActivityStore';
import CategoryStore from '../stores/CategoryStore';
import ProjectStore from '../stores/ProjectStore';

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
            activities: ActivityStore.getActivityList(),
            categories: CategoryStore.getCategoryList(),
            projects: ProjectStore.getProjectList()
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
    render(){
        var activityDiv;
        if(this.state.showingCreate) {            
            activityDiv = <EditActivityDiv  {...this.state}
                show={ this.state.showingCreate } 
                onSave={this.__handleSaveActivity} 
                onCancel={this.__handleCancelActivity}
            />;            
        }
         
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar onCreateNewActivity={ this.__handleCreateNewActivity }/>
                <hl/>
                <div className='container'>
                    {activityDiv}
                    <ActivityList
                        activities={this.state.activities} 
                    />
                </div>
            </div>
        );
    }
}