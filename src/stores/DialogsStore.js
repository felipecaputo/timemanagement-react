'use strict';

import TMDispatcher from '../dispatcher/TMDispatcher';
import Cons from '../constants/DialogsConstants';
import ActivityUtils from '../util/ActivityUtils';
import ActivityActions from '../actions/ActivityActionCreator';
import * as FluxUtils from 'flux/utils';


/**
 * (description)
 * 
 * @export
 * @class DialogsStore
 * @extends {FluxUtils.Store}
 */
export default class DialogsStore extends FluxUtils.Store {
    constructor(dispatcher){
        this.events = [
            
        ]
    }
    getConfirmDialogInfo() {
        return this.confirmDialogInfo;
    }
    getNotifications() {
        return this.notifications || [];
    }
    __onDispatch(payload){
        switch (payload.type) {
            case Cons.SHOW_CONFIRM_DIALOG:
                this.confirmDialogInfo = payload.data
                break;
            case Cons.CONFIRM_DIALOG_DISMISSED:
                this.confirmDialogInfo = null;
                break;
        }
    }
}