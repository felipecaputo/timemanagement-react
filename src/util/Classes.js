export class Activity {
    constructor(activity) {
        this.id = undefined;
        this.title = undefined;
        this.description = undefined;
        this.category = undefined;
        this.projectId = undefined;
        this.categoryId = undefined;
        this.totalDuration = 0;
        this.isRunning = false;
        this.status = undefined;
        this.lastStartTime = 0;
        this.lastEndTime = 0;
        this.periods = [];
    }
}

//++id,title,categoryId,projectId,totalDuration,isRunning,status,lastStartTime,lastEndTime,periods