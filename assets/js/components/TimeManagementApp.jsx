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
        this.__handleCreateNewActivity= this.__handleCreateNewActivity.bind(this);
        this.__handleCancelActivity = this.__handleCancelActivity.bind(this);
        this.__handleSaveActivity = this.__handleSaveActivity.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__toggleShowFinished = this.__toggleShowFinished.bind(this);
        
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
    render(){
        let activityDiv, finishedActivities;
        if(this.state.showingCreate) {            
            activityDiv = <EditActivityDiv  {...this.state}
                show={ this.state.showingCreate } 
                onSave={this.__handleSaveActivity} 
                onCancel={this.__handleCancelActivity}
            />;            
        }
        
        if (this.state.showFinished){
            finishedActivities = (
                <div>
                    <h4>Finished Activities</h4>
                    <ActivityList
                        activities={this.state.finishedActivities} 
                    />
                </div>
            )
        }
        
        
        return (
            <div className='container-fluid'>
                <AppTile />
                <AppToolBar 
                    onCreateNewActivity={ this.__handleCreateNewActivity }
                    showFinished={this.state.showFinished}
                    onToggleShowFinished={this.__toggleShowFinished}/>
                <hl/>
                <div className='container'>
                    {activityDiv}
                    <div>
                        <h4>Current Activities</h4>
                        <ActivityList
                            activities={this.state.activities} 
                        />
                    </div>
                    {finishedActivities}
                </div>
            </div>
        );
    }
}