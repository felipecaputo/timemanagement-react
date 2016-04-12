import ActivityConstants from '../constants/ActivityConstants';
import Dispatcher from '../dispatcher/TMDispatcher';

class ActivityActions {
    /**
     * Starts the [Activity] identified by @activityId
     * 
     * @param [Number] activityId The id of the activity to be started
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
     * Creates a new activity
     * 
     * @param {Boolean=} [showCreateWindow=true] if true, a windows will be show to fill information about the activity
     * or else it`ll be create with default values  
     */
    createNew(showCreateWindow = true){
        Dispatcher.dispatch({
            type: ActivityConstants.ACTIVITY_CREATE_NEW,
            showCreateWindows: showCreateWindow
        })
    }
}

let activityActions = new ActivityActions() ;

export default activityActions;