'use strict';

import DB from './StorageUtil';
import Cons from '../constants/ActivityConstants';
import ActivityActions from '../actions/ActivityActionCreator';
import TMDispatcher from '../dispatcher/TMDispatcher';

class ActivityUtils {
    /**
     * Returns an array with all activities in the given status
     * 
     * @param {string} status the status of the expected activities
     * @returns {Promise<Array<Object>>} A list of activities in the given status
     */
    getActivityListByStatus(status){
        return new Promise( (resolve, reject) => {
            DB.activities.where('status').equals(status).toArray()
                .then( activityList => resolve(activityList))
                .catch( error => reject(error));
        })
    }
    /**
     * Get all activities with an **Active** status 
     * 
     * @returns {Promise<Object[]>} A promise that resolves to an activity list
     */
    getCurrentActivities() {
        return this.getActivityListByStatus(Cons.ACTIVITY_STATUS.ACTIVE);
    }
    /**
     * Get all activities with an **Finished** status 
     * 
     * @returns {Promise<Object[]>} A promise that resolves to an activity list
     */
    getFinishedActivities(){
        return this.getActivityListByStatus(Cons.ACTIVITY_STATUS.FINISHED);
    }
    
    /**
     * Add a new activity to the database
     * 
     * @param {Object} activity The activity to be added in database
     * @returns {Promise<Object>} that resolves with the activity after inserted in DB
     */
    addNewActivity(activity) {
        return new Promise( (resolve, reject) => {
            if (activity.id) {
                reject('Cannot add a new ativity that already have an Id');
                return;
            }
            
            if (!activity.status)
                activity.status = Cons.ACTIVITY_STATUS.ACTIVE;
            
            if (!activity.running) activity.running = false;
            activity.totalDuration = 0;
                        
            DB.activities.add(activity)
                .then( id => {
                    activity.id = id;
                    resolve(activity)
                })
                .catch( err => reject(err));
        } )
    }
    /**
     * Updated an activity in storage
     * 
     * @param {Object} activity The activity to be updated
     * @returns {Promise<undefined>}
     */
    updateActivity(activity){
        return DB.activities.update(activity.id, activity);
    }
    saveActivity(activity){
        if (!activity.id || activity.id <= 0) return this.addNewActivity(activity)
        else return new Promise((resolve, reject) => this.updateActivity(activity).then(() => resolve(activity)));
    }
    /**
     * Stop the given Activity
     * 
     * @param {Object} activity The activity to be stoped
     * @returns {Promise<Object>} A promise that resolves with the updated activity after update the activity
     */
    stopActivity(activity){
        return new Promise ( ( resolve, reject ) => {
            console.log('stoping activity', activity.id);
            activity.lastEndTime = new Date().getTime();
            if (!activity.periods) activity.periods = [];
            
            activity.totalDuration = 0;
            activity.periods.forEach( p => {
                if (p.end == Cons.INVALID_ENDTIME) p.end = activity.lastEndTime;
                activity.totalDuration += (p.end - p.start);
            });
            this.updateActivity(activity)
                .then(() => {
                    ActivityActions.updateActivity(activity); //TODO: Improve here, maybe we should've called stop from actions instead of utils
                    resolve(activity);
                })
                .catch(reject);            
        })
    }
    /**
     * Stops all activities
     * 
     * @returns {Promise<>} Returns a promise that resolves when all activities are stopped
     */
    stopAllActivities() {
        return new Promise( (res, rej) => {
            DB.activities.where('lastEndTime').equals(Cons.INVALID_ENDTIME).toArray()
                .then( activities => {
                    if((!activities) || (activities.lenght === 0)){
                        res();
                        return;
                    }
                    Promise.all(activities.map(a=> this.stopActivity(a)))
                        .then(res)
                        .catch(rej)
                })
                .catch( e=>rej(e));
        } )
    }
    /**
     * Starts time management of given activity
     * 
     * @param {Object} activity The activity to be started
     * @returns {Promise<Object>} A promise that resolves with the updated activity
     */
    startActivity(activity){
        return new Promise( ( res, rej ) => {  
            this.stopAllActivities()
                .then( () => {
                    activity.lastEndTime = Cons.INVALID_ENDTIME;
                    activity.lastStartTime = new Date().getTime();
                    if(!activity.periods) activity.periods = [];
                    
                    activity.periods.push({start: activity.lastStartTime, end: activity.lastEndTime});
                    
                    this.updateActivity(activity)
                        .then(() => res(activity))
                        .catch(rej);
                })
                .catch(rej);
        })
    }
    /**
     * Stops and set as finished the given activity
     * 
     * @param {Object} activity (description)
     * @returns {Promise<Object>} the updated activity
     */
    finishActivity(activity){
        return new Promise( (resolve, reject) => {
            this.stopActivity(activity)
            .then(act => {
                act.status = Cons.ACTIVITY_STATUS.FINISHED;
                this.updateActivity(act).then(() => resolve(act));
            })
        })
    }
}

let activityUtils = new ActivityUtils();

export default activityUtils;