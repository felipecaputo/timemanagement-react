import Cons from '../../src/constants/ActivityConstants';

export function getNewActivity() {    
    return {
        id: 1,
        status: Cons.ACTIVITY_STATUS.ACTIVE,
        lastStartTime: 0,
        lastEndTime: 0,
        totalDuration: 0
    }
}

export function getFinishedActivity () {
    return Object.assign(getNewActivity(), {status: Cons.ACTIVITY_STATUS.FINISHED});
}

export function getActivityWithDuration(duration){
    return Object.assign(getNewActivity(), {totalDuration: duration});
}

export function getRunningActivity(duration){
    return Object.assign(getNewActivity(), {
        lastStartTime: new Date().getTime(), 
        lastEndTime: Cons.INVALID_ENDTIME
    });
}