'use strict';

import { EventEmitter } from 'events';

import TMDispatcher from '../dispatcher/TMDispatcher';
import ActivityConsts from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';
import ActivityActions from '../actions/ActivityActionCreator';


/**
 * (description)
 * 
 * @export
 * @class ActivityStore
 * @extends {EventEmitter}
 */
class ActivityStore extends EventEmitter {
    /**
     * Creates an instance of ActivityStore.
     */
    constructor() {
        super();
        this.dispId = TMDispatcher.register(this._onAction);
        this.activityList = [];
        console.log('Id:', this.dispId);
    }
    emitChange() {
        this.emit('CHANGE');
    }
    /**
     * Event that receives fired actions
     * 
     * @param {Object} action JSXAction to be processed by store
     */
    _onAction(payload){
        switch (payload.type) {
            case ActivityConsts.ACTIVITY_STARTED:
                this.startActivity(payload.activityId);
                break;
            case ActivityConsts.ACTIVITY_STOPED:
                this.stopActivity(payload.activityId);
                break;
            case ActivityConsts.ACTIVITY_CREATE_NEW:
                alert('worked2');
                console.log('it works!!!');
                break;
            case ActivityConsts.ACTIVITY_LIST_UPDATED:
                this.activityList = payload.activityList;
                break;
        }
    }
    /**
     * Starts the activity with the informed id
     * 
     * @param {number} activityId The id of the activity that will be started
     */
    startActivity(activityId) {

    }
    stopActivity(activityId){
        
    }
    getActivities(){
        ActivityUtils.getCurrentActivities()
            .then( activityList => {
                ActivityActions.updateActivityList(activityList);
            } )
    }
}

let store = new ActivityStore();

export default store;