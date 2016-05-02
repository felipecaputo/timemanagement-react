import ActivityConstants from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';
import Dispatcher from '../dispatcher/TMDispatcher';

class ActivityActions {
    /**
     * Starts the given {Activity}
     * 
     * @param {Object} activity The activity to be started
     */
    startActivity(activity) {
        ActivityUtils.startActivity(activity)
            .then(act => Dispatcher.handleClientAction(ActivityConstants.ACTIVITY_STARTED,act));
        
    }
    stopActivity(activity) {
        ActivityUtils.stopActivity(activity)
            .then(act => Dispatcher.handleClientAction(ActivityConstants.ACTIVITY_STOPED,act));        
    }
    deleteActivity(activityId) {
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_DELETED,
            id: activityId
        });
    }
    /**
     * Notify all listeners that the Activity has been updated
     * 
     * @param {Object} activity An activity object
     */
    updateActivity(activity) {
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_UPDATED,
            activity: activity
        })
    }
    /**
     * Notify all listeners that the activity list was changed
     * 
     * @param {Object[]} activityList A list of Activities
     */
    updateActivityList(activityList) {
        Dispatcher.handleClientAction(ActivityConstants.ACTIVITY_LIST_UPDATED, activityList);
    }
    createActivity(activity) {
        ActivityUtils.addNewActivity(activity)
            .then( activity => {
                Dispatcher.dispatch({
                    type: ActivityConstants.ACTIVITY_CREATED,
                    activity: activity
                })
            })
    }
    /**
     * Load all currecnt active activities and, when done,  fires dispatcher notifying with the
     * new activity list
     */
    getCurrentActivities() {
        ActivityUtils.getCurrentActivities()
            .then(activityList => {
                Dispatcher.handleClientAction(ActivityConstants.ACTIVITY_LIST_UPDATED, activityList);
            })
    }
}

let activityActions = new ActivityActions() ;

export default activityActions;