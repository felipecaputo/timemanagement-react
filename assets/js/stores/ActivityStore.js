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
        this.__finishedActivityList = [];
        ActivityActions.getCurrentActivities();
    }
    /**
     * Event that receives fired actions
     * 
     * @param {Object} action JSXAction to be processed by store
     */
    __onDispatch(payload){
        switch (payload.type) {
            case ActivityConsts.ACTIVITY_STARTED:
                this.startActivity(payload.data);
                break;
            case ActivityConsts.ACTIVITY_STOPED:
                this.stopActivity(payload.data);
                break;
            case ActivityConsts.ACTIVITY_CREATE_NEW:
                this.__fireCreateNew();
                break;
            case ActivityConsts.ACTIVITY_LIST_UPDATED:
                this.__setActivityList(payload.data);
                break;
            case ActivityConsts.ACTIVITY_CREATED:
                this.__addActivity(payload.activity);
                break;
            case ActivityConsts.ACTIVITY_UPDATED:
                this.updateActivity(payload.data);
                break;
            case ActivityConsts.ACTIVITY_DONE:
                this.updateActivity(payload.data);
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
    __putToList(aList, activity){
        return new Promise( (resolve, reject) => {
            let l=aList.length;
            for (let i = 0; i < l; i++) {
                if (aList[i].id == activity.id) {
                    aList[i] = activity;
                    resolve();
                    return;
                }
            }
            aList.push(activity);
            resolve();
            return;            
        })
    }
    /**
     * (description)
     * 
     * @param {Array<Object>} aList (description)
     * @param {Object} activity (description)
     * @returns {Promise<Object>} A Promise that resolves without data, when operation finishs
     */
    __removeFromList(aList, activity){
        return new Promise((resolve, reject) => {
            let l= aList.length;
            for (var i = 0; i < l; i++) {
                if (aList[i].id == activity.id) {
                    aList.splice(i,1);
                    break;
                }
            }
            resolve();
        });
    }
    __updateCurrentActivityList(activity){
        let args = [this.__activityList, activity];
        if(activity.status === ActivityConsts.ACTIVITY_STATUS.ACTIVE){
            console.log('Updated on active list', activity.id);
            return this.__putToList(...args)
        }
        else{
            console.log('Removed on active list', activity.id);
            return this.__removeFromList(...args);
        }
    }
    __updateFinishedActivityList(activity){
        let args = [this.__finishedActivityList, activity];
        if(activity.status === ActivityConsts.ACTIVITY_STATUS.FINISHED){
            console.log('Updated on finished list', activity.id);
            return this.__putToList(...args);
        }
        else {
            console.log('Removed on finished list', activity.id);
            return this.__removeFromList(...args);
        }
    }
    /**
     * Returns the internal activity list
     * 
     * @returns {ActivityList[]} Activity list
     */
    getActivityList() {
        return this.__activityList;
    }
    updateActivity(activity){
      console.log('updated', activity.id);
      return Promise.all([
          this.__updateCurrentActivityList(activity),
          this.__updateFinishedActivityList(activity)
      ]).then(this.__emitChange());
    }
    /**
     * Starts the activity with the informed id
     * 
     * @param {number} activityId The id of the activity that will be started
     */
    startActivity(activity) {
        this.updateActivity(activity);
    }
    stopActivity(activity){
        
        console.log('stopped', activity.id);
        this.updateActivity(activity);
    }
}

let store = new ActivityStore(TMDispatcher);

export default store;