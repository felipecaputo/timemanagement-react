"use strict";

import Dexie from 'dexie';

let db = new Dexie("ActivitiesDatabase");

db.version(2).stores({
    activities: "++id,title,categoryId,projectId,totalDuration,isRunning,status",
    projectGroup: "++id,groupName,description",
    projects: "++id,groupId,projectName,projectDescription,color",
    categories: "++id,category,description,color"
});

db.version(1).stores({
    activities: "++id,title,categoryId,projectId,totalDuration,status",
    projectGroup: "++id,groupName",
    projects: "++id,groupId,projectName,projectDescription",
    categories: "++id,category"
});

export default db;