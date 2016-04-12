"use strict";

import DB from './StorageUtil';
import ActivityConstants from '../constants/ActivityConstants';

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
}

let activityUtils = new ActivityUtils();

export default activityUtils;