'use strict';

import * as FluxUtils from 'flux/utils';
import TMDispatcher from '../dispatcher/TMDispatcher';
import ProjectCons from '../constants/ProjectConstants';
import ActionCreator from '../actions/ProjectActionCreator';

class ProjectStore extends FluxUtils.Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.projectsList = [];
        ActionCreator.loadCurrentProjects();
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
                this.__addProject(payload.data);
                break;
            case ProjectCons.PROJECT_DEACTIVATE:
                break;
            case ProjectCons.PROJECT_DELETE:
                break;
            case ProjectCons.PROJECT_LIST_UPDATED:
                this.__updateProjList(payload.data);
                break;
            default:
                break;
        }
    }
    getProjectList(){
        return this.projectsList;
    }
    __updateProjList(list){
        this.projectsList = list;
        this.__emitChange();
    }
}

let store = new ProjectStore(TMDispatcher);

export default store;