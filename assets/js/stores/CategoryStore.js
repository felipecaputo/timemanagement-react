'use strict';

import * as Utils from 'flux/utils';
import Cons from '../constants/CategoryConstants';

class CategoryStore extends Utils.Store {
    constructor(props){
        super(props);
        this.catList = []
    }
    __updateList(newList){
        this.catList = newList;
        this.__emitChange();
    }
    __addCategory(category){
        this.catList.push(category);
        this.__emitChange();
    }
    __onDispatch(payload){
        switch (payload.type) {
            case Cons.CATEGORY_LIST_UPDATED:
                this.__updateList(payload.data)
                break;
            case Cons.CATEGORY_ADDED:
                this.__addCategory(payload.data);
                break;
            default:
                break;
        }
    }
    getCategoryList() {
        return this.catList;
    }
}

let c = new CategoryStore()
export default c;