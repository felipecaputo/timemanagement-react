"use strict";

import DB from './StorageUtil.js';
import ActivityConstants from '../constants/ActivityConstants';

class ActivityUtils {
    /**
     * (description)
     * 
     * @returns {Promise} A promise that resolves to an activity list
     */
    getActivities() {
        return new Promise( (resolve, reject) => {
            DB.activities.where('status').equals(ActivityConstants.ACTIVITY_STATUS_ACTIVE).toArray()
                .then( activityList => {
                    resolve(activityList)
                })
                .catch( error => reject(error));            
        })
    }
}