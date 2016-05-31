'use strict';

import * as Utils from 'flux/utils';
import Cons from '../constants/CategoryConstants';
import Dispatcher from '../dispatcher/TMDispatcher';
import CategoryUtils from '../util/CategoryUtils';
import CategoryActions from '../actions/CategoryActionCreator';

class CategoryStore extends Utils.Store {
    constructor(dispatcher){
        super(dispatcher);
        this.catList = [];
        CategoryActions.loadCategories();
    }
    __updateList(newList){
        this.catList = newList || [];
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
        }
    }
    getCategoryList() {
        return this.catList;
    }
}

let c = new CategoryStore(Dispatcher);
export default c;