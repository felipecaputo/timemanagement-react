import ActivityConstants from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';
import Dispatcher from '../dispatcher/TMDispatcher';

class ActivityActions {
    /**
     * Starts the {Activity} identified by @activityId
     * 
     * @param {Number} activityId The id of the activity to be started
     */
    startActivity(activityId) {        
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_STARTED,
            id: activityId
        });
    }
    stopActivity(activityId) {
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_STOPED,
            id: activityId
        });        
    }
    deleteActivity(activityId) {
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_DELETED,
            id: activityId
        });
    }
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