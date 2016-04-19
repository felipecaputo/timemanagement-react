'use strict';

import DB from './StorageUtil';

class ProjectUtils {
    
    /**
     * Returns the list with all projects
     * 
     * @returns {Promise<Object[]>} a promise that resolves with all projects
     */
    getCurrentProjects() {
        return DB.projects.toArray();
    }
    /**
     * Adds a new project to DB
     * 
     * @param {Object} project The project object to be added to DB
     * @returns {Promise<Object>}
     */
    addProject(project){
        return new Promise( (resolve, reject) => {
            if (!project.id || (project.id > 0)) {
                reject('Cannot add a project that already has an Id');
                return;
            }
            
            DB.projects.add(project)
                .then( id => {
                    project.id = id;
                    resolve(project);
                })
                .catch(e => reject(e));
        } )
    }
}

let p = ProjectUtils();

export default p;