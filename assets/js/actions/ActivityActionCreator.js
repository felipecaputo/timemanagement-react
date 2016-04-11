import ActivityConstants from '../constants/ActivityConstants';
import Dispatcher from '../dispatcher/TMDispatcher';

class ActivityActions {
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
}

let activityActions = new ActivityActions() ;

export default activityActions;