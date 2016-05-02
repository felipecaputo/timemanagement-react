'use strict';

import Cons from '../constants/ProjectConstants';
import TMDispatcher from '../dispatcher/TMDispatcher';
import ProjectUtil from '../util/ProjectUtils';

class ProjectActionCreator {
    addProject(project){
        ProjectUtil.addProject(project)
            .then( proj => TMDispatcher.handleClientAction(Cons.PROJECT_ADD, project));
    }
    loadCurrentProjects() {
        ProjectUtil.getCurrentProjects()
            .then( projList => TMDispatcher.handleClientAction(Cons.PROJECT_LIST_UPDATED, projList));
    }
    deleteProject(projectId){
        
    }
    activateProject(projectId){
        
    }
    deactivateProject(projectId){
        
    }
}

let p = new ProjectActionCreator();

export default p;