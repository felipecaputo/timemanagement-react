'use strict';

import * as FluxUtils from 'flux/utils';
import TMDispatcher from '../dispatcher/TMDispatcher';
import ProjectCons from '../constants/ProjectConstants';

class ProjectStore extends FluxUtils.Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.projectsList = []
    }
    __addProject(project){
        this.projectsList.push(project);
        this.__emitChange();
    }
    __onDispatch(payload){
        switch (payload.type) {
            case ProjectCons.PROJECT_ACTIVATE:
                
                break;
            case ProjectCons.PROJECT_ADD:
                this.__addProject(payload.project);
                break;
            case ProjectCons.PROJECT_DEACTIVATE:
                break;
            case ProjectCons.PROJECT_DELETE:
                break;
            default:
                break;
        }
    }
}

let store = new ProjectStore(TMDispatcher);

export default store;