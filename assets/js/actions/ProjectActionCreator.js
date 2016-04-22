'use strict';

import ProjectCons from '../constants/ProjectConstants';
import TMDispatcher from '../dispatcher/TMDispatcher';
import ProjectUtil from '../util/ProjectUtils';

class ProjectActionCreator {
    addProject(project){
        ProjectUtil.addProject(project)
            .then( proj => {
                TMDispatcher.dispatch({
                    type: ProjectCons.PROJECT_ADD,
                    project: project
                });
            })
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