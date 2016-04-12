"use strict";

import Dexie from 'dexie';

let db = new Dexie("ActivitiesDatabase");

db.version(1).stores({
    activities: "++id,title,categoryId,projectId,totalDuration,status",
    projectGroup: "++id,groupName",
    projects: "++id,groupId,projectName,projectDescription",
    categories: "++id,category"
});

export default db;