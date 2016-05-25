import Cons from '../constants/ActivityConstants';
import ActivityUtils from '../util/ActivityUtils';
import Dispatcher from '../dispatcher/TMDispatcher';
import {Activity} from '../util/Classes';

class ActivityActions {
    /**
     * Starts the given {Activity}
     * 
     * @param {Activity} activity The activity to be started
     */
    startActivity(activity) {
        ActivityUtils.startActivity(activity)
            .then(act => Dispatcher.handleClientAction(Cons.ACTIVITY_STARTED,act));
        
    }
    /**
     * Stop the given activity and register the end of the period
     * 
     * @param {Activity} activity
     */
    stopActivity(activity) {
        console.log('stopping', activity.id);
        ActivityUtils.stopActivity(activity)
            .then(act => Dispatcher.handleClientAction(Cons.ACTIVITY_STOPED,act));        
    }
    deleteActivity(activityId) {
        Dispatcher.dispatch({
            type: Cons.ACTIVITY_DELETED,
            id: activityId
        });
    }
    /**
     * Notify all listeners that the Activity has been updated
     * 
     * @param {Object} activity An activity object
     */
    updateActivity(activity) {
        Dispatcher.handleRequestAction( Cons.ACTIVITY_UPDATED, activity );
    }
    /**
     * Notify all listeners that the activity list was changed
     * 
     * @param {Object[]} activityList A list of Activities
     */
    updateActivityList(activityList) {
        Dispatcher.handleClientAction(Cons.ACTIVITY_LIST_UPDATED, activityList);
    }
    createActivity(activity) {
        ActivityUtils.saveActivity(activity)
            .then( activity => Dispatcher.handleClientAction(Cons.ACTIVITY_CREATED, activity))
    }
    saveActivity(activity){
        if(!activity.id || activity.id <= 0)
            createActivity(activity);
        else {
            ActivityUtils.updateActivity(activity)
                .then(() => this.updateActivity(activity));
        }
    }
    finishActivity(activity) {
        ActivityUtils.finishActivity(activity)
            .then(act => {
                Dispatcher.handleClientAction(Cons.ACTIVITY_DONE, act);
            })
    }
    /**
     * Load all currecnt active activities and, when done,  fires dispatcher notifying with the
     * new activity list
     */
    getCurrentActivities() {
        ActivityUtils.getCurrentActivities()
            .then(activityList => {
                Dispatcher.handleClientAction(Cons.ACTIVITY_LIST_UPDATED, activityList);
            })
    }
    /**
     * Load all finished activities and fires dispatcher notifying that finished activity lists
     * was updated and the new list
     */
    getFinishedActivities(){
        ActivityUtils.getFinishedActivities()
            .then(list => Dispatcher.handleClientAction(Cons.ACTIVITY_FINISHED_LIST_UPDATED, list));
    }
}

let activityActions = new ActivityActions() ;

export default activityActions;