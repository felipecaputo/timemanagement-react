"use strict";

import DB from './StorageUtil';
import ActivityConstants from '../constants/ActivityConstants';
import ActivityActions from '../actions/ActivityActionCreator';

class ActivityUtils {
    /**
     * Get all activities with an [Active] status 
     * 
     * @returns {Promise<ActivityList[]>} A promise that resolves to an activity list
     */
    getCurrentActivities() {
        return new Promise( (resolve, reject) => {
            DB.activities.where('status').equals(ActivityConstants.ACTIVITY_STATUS_ACTIVE).toArray()
                .then( activityList => {
                    resolve(activityList)
                })
                .catch( error => reject(error));            
        })
    }
    addNewActivity(activity) {
        return new Promise( (resolve, reject) => {
            if (activity.id) {
                reject('Cannot add a new ativity that already have an Id');
                return;
            }
            
            db.activities.add(activity)
                .then( id => {
                    activity.id = id;
                    ActivityActions.notifyActivityCreated(activity);
                })
                .catch( err => reject(err));
        } )
    }
}

let activityUtils = new ActivityUtils();

export default activityUtils;