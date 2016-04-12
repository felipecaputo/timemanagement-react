'use strict';

import { EventEmitter } from 'events';

import TMDispatcher from '../dispatcher/TMDispatcher';
import ActivityConsts from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';


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
        TMDispatcher.register(this._onAction);
    }
    emitChange() {
        this.emit('CHANGE');
    }
    /**
     * Event that receives fired actions
     * 
     * @param {Object} action JSXAction to be processed by store
     */
    _onAction(action){
        switch (action.actionType) {
            case ActivityConsts.ACTIVITY_STARTED:
                this.startActivity(action.activityId);
                break;
            case ActivityConsts.ACTIVITY_STOPED:
                this.stopActivity(action.activityId);
                break;
            case ActivityConsts.ACTIVITY_CREATE_NEW:
                alert('worked2');
                console.log('it works!!!');
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
        
    }
}

let store = new ActivityStore();

export default store;