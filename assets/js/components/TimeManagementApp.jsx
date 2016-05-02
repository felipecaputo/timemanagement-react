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
            categories: CategoryStore.getCategoryList()
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
            categories: CategoryStore.getCategoryList()
        })
    }
    componentDidMount(){
        this.activityToken = ActivityStore.addListener(this.__handleChange);
        this.categoryToken = CategoryStore.addListener(this.__handleChange);
    }
    componentWillUnmount(){
        this.activityToken();
        this.categoryToken();
    }
    render(){
        var createModal;
        if(this.state.showingCreate) {
            // createModal = <CreateActivityModal
            //             activities={this.state.activities}
            //             categories={this.state.categories}
            //     show={ this.state.showingCreate } 
            //     onSave={this.__handleSaveActivity} 
            //     onCancel={this.__handleCancelActivity}
            //     enforceFocus={false}
            //     />;
            
createModal = <EditActivityDiv
                        activities={this.state.activities}
                        categories={this.state.categories}
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
                    {createModal}
                    <ActivityList
                        activities={this.state.activities}
                        categories={this.state.categories} 
                    />
                </div>
            </div>
        );
    }
}