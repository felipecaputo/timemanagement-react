'use strict';

import DB from './StorageUtil';
import Cons from '../constants/ActivityConstants';
import ActivityActions from '../actions/ActivityActionCreator';
import TMDispatcher from '../dispatcher/TMDispatcher';

class ActivityUtils {
    /**
     * Get all activities with an [Active] status 
     * 
     * @returns {Promise<Object[]>} A promise that resolves to an activity list
     */
    getCurrentActivities() {
        return new Promise( (resolve, reject) => {
            DB.activities.where('status').equals(Cons.ACTIVITY_STATUS.ACTIVE).toArray()
                .then( activityList => {
                    TMDispatcher.handleRequestAction(Cons.ACTIVITY_LIST_UPDATED,activityList);
                })
                .catch( error => reject(error));
        })
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
        console.log(activity.id, JSON.stringify(activity));
        return DB.activities.update(activity.id, activity);
    }
    /**
     * Stop the given Activity
     * 
     * @param {Object} activity The activity to be stoped
     * @returns {Promise<Object>} A promise that resolves with the updated activity after update the activity
     */
    stopActivity(activity){
        return new Promise ( ( resolve, reject ) => {
            console.log('stoping activity', JSON.stringify(activity));
            activity.lastEndTime = new Date().getTime();
            if (!activity.periods) activity.periods = [];
            
            activity.totalDuration = 0;
            activity.periods.forEach( p => {
                if (p.end == Cons.INVALID_ENDTIME) p.end = activity.lastEndTime;
                activity.totalDuration += (p.end - p.start);
            });
            this.updateActivity(activity)
                .then(() => resolve(activity))
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
}

let activityUtils = new ActivityUtils();

export default activityUtils;