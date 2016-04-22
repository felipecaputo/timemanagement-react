export class Activity {
    constructor(activity) {
        this.id = activity.id || -1;
        this.title = activity.title || '';
        this.description = activity.description || '';
        this.category = activity.category || '';
        this.projectId = activity.projectId || -1;
        this.categoryId = activity.categoryId || -1;
    }
}