'use strict';

import TMDispatcher from '../dispatcher/TMDispatcher';
import ActivityConsts from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';
import ActivityActions from '../actions/ActivityActionCreator';
import * as FluxUtils from 'flux/utils';


/**
 * (description)
 * 
 * @export
 * @class ActivityStore
 * @extends {EventEmitter}
 */
class ActivityStore extends FluxUtils.Store {
    /**
     * Creates an instance of ActivityStore.
     */
    constructor(dispatcher) {
        super(dispatcher);  
        this.__activityList = [];
    }
    /**
     * Event that receives fired actions
     * 
     * @param {Object} action JSXAction to be processed by store
     */
    __onDispatch(payload){
        switch (payload.type) {
            case ActivityConsts.ACTIVITY_STARTED:
                this.startActivity(payload.activityId);
                break;
            case ActivityConsts.ACTIVITY_STOPED:
                this.stopActivity(payload.activityId);
                break;
            case ActivityConsts.ACTIVITY_CREATE_NEW:
                this.__fireCreateNew();
                break;
            case ActivityConsts.ACTIVITY_LIST_UPDATED:
                this.__setActivityList(payload.activityList);
                break;
            case ActivityConsts.ACTIVITY_CREATED:
                this.__addActivity(payload.activity);
                break;
        }
    }
    __addActivity(activity){
        this.__activityList.push(activity);
        this.__emitChange();
    }
    __setActivityList(activityList) {
        this.__activityList = activityList;
        this.__emitChange();
    }
    __fireCreateNew(){
        this.showCreateModal = true
        this.__emitChange();
    }
    /**
     * Returns the internal activity list
     * 
     * @returns {ActivityList[]} Activity list
     */
    getActivityList() {
        return this.__activityList;
    }
    /**
     * Starts the activity with the informed id
     * 
     * @param {number} activityId The id of the activity that will be started
     */
    startActivity(activityId) {
        this.__emitChange()
    }
    stopActivity(activityId){
        this.__emitChange()
    }
}

let store = new ActivityStore(TMDispatcher);

export default store;