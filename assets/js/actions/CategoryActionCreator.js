'use strict';

import CategoryUtils from '../util/CategoryUtils';
import Dispatcher from '../dispatcher/TMDispatcher';
import Cons from '../constants/CategoryConstants';

class CategoryActionCreator {
    /**
     * Insert a new category in database
     * 
     * @param {Object} category the category to be added in DB
     */
    createCategory(category){
        Dispatcher.handleClientAction(Cons.CATEGORY_ADDING, category);
        CategoryUtils.addCategory(category)
            .then( newCat => Dispatcher.handleClientAction(Cons.CATEGORY_ADDED, newCat))
            .catch( err => {})
    }
    /**
     * Load all categories and emmit info that list was updated
     */
    loadCategories(){
        CategoryUtils.getCurrentCategories()
            .then( list => { Dispatcher.handleClientAction(Cons.CATEGORY_LIST_UPDATED, list) });
    }
}