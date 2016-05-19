"use strict";

import Dexie from 'dexie';
import {Activity} from './Classes';

let db = new Dexie("ActivitiesDatabase");

db.version(3).stores({
    activities: "++id,title,categoryId,projectId,totalDuration,isRunning,status,lastStartTime,lastEndTime,periods",
    projectGroup: "++id,groupName,description",
    projects: "++id,groupId,projectName,projectDescription,color",
    categories: "++id,category,description,color"
});

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

db.activities.mapToClass(Activity);

export default db;